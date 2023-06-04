import Axios from 'axios';
import { configure } from 'axios-hooks';
import Cookies from 'js-cookie';
import LRU from 'lru-cache';
import Router from 'next/router';

import {
    ACCEPT_LANGUAGE,
    ACCESS_TOKEN,
    APPLICATION_JSON,
    BEARER,
    CACHE_MAX,
    CONTENT_TYPE,
    LOGOUT_URL,
    MAIN_URL,
    NEXT_LOCALE,
    REFERRER,
    REFRESH_TOKEN,
    STATUS_401,
    TOKEN_EXPIRE,
    TOKEN_EXPIRED,
} from '@/constants';
import { Bool } from '@enums/common';

const urls = {
    cypress: process.env.CYPRESS_API_URL,
    development: process.env.DEVELOPMENT_API_URL,
    local: process.env.LOCAL_API_URL,
    production: process.env.PRODUCTION_API_URL,
    test: process.env.TEST_API_URL,
};

const baseURL = urls[process.env.DEPLOYMENT_ENV as typeof process.env.NODE_ENV];

export const axios = Axios.create({
    baseURL,
});

const axiosRetry = Axios.create({
    baseURL,
});

const cache = new LRU({ max: CACHE_MAX });
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (e: Error | null, accessToken: string | null) => {
    failedQueue.forEach((item) => {
        !!e ? item.reject(e) : item.resolve(accessToken);
    });

    failedQueue = [];
};

axios.interceptors.request.use(
    async (conf) => {
        const accessToken = Cookies.get(ACCESS_TOKEN);
        const nextLocale = Cookies.get(NEXT_LOCALE);

        if (!!accessToken) {
            conf.headers = {
                Authorization: `${BEARER} ${accessToken}`,
                [CONTENT_TYPE]: APPLICATION_JSON,
            };
        }

        if (!!nextLocale) {
            conf.headers = !!accessToken
                ? {
                      [ACCEPT_LANGUAGE]: nextLocale,
                      Authorization: `${BEARER} ${accessToken}`,
                      [CONTENT_TYPE]: APPLICATION_JSON,
                      locale: nextLocale,
                  }
                : {
                      [ACCEPT_LANGUAGE]: nextLocale,
                      [CONTENT_TYPE]: APPLICATION_JSON,
                      locale: nextLocale,
                  };
        }

        return conf;
    },
    (e) => {
        Promise.reject(e);
    },
);

axios.interceptors.response.use(
    (res) => {
        return res;
    },

    async (e) => {
        const originalReq = e.config;
        const response = e.response;
        const status = response?.status ?? null;
        const errorCode = response?.data?.error?.code ?? null;
        let blobError = null;

        const parseBlob = async (file: File) => {
            const reader = new FileReader();

            reader.readAsText(file);

            return await new Promise((resolve) => {
                reader.onload = function (event) {
                    resolve(reader.result);
                };
            });
        };

        if (typeof window !== 'undefined' && e.response?.data instanceof Blob) {
            blobError = await parseBlob(e.response.data);
        }

        if (
            status === STATUS_401 &&
            (errorCode === 'example-error-code' ||
                (!!blobError &&
                    JSON.parse(blobError as unknown as string).error.code ===
                        'example-error-code')) &&
            !originalReq._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((accessToken) => {
                        originalReq.headers.Authorization = `${BEARER} ${accessToken}`;

                        return axios(originalReq);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalReq._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                axiosRetry
                    .post('/exmaple/api/update-token', {
                        refresh_token: Cookies.get(REFRESH_TOKEN),
                    })
                    .then((res) => {
                        const {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        } = res.data.result;

                        Cookies.set(ACCESS_TOKEN, accessToken, {
                            expires: TOKEN_EXPIRE,
                            path: MAIN_URL,
                        });

                        Cookies.set(REFRESH_TOKEN, refreshToken, {
                            expires: TOKEN_EXPIRE,
                            path: MAIN_URL,
                        });

                        originalReq.headers.Authorization = `${BEARER} ${accessToken}`;
                        processQueue(null, accessToken);
                        resolve(axios(originalReq));
                    })
                    .catch((e) => {
                        const pathname = Router.pathname;

                        if (pathname.includes('/example/url/protected')) {
                            Cookies.set(TOKEN_EXPIRED, Bool.TRUE, {
                                path: MAIN_URL,
                            });

                            sessionStorage.setItem(REFERRER, Router.asPath);
                            Router.push(LOGOUT_URL);
                        } else {
                            Cookies.remove(ACCESS_TOKEN);
                            Cookies.remove(REFRESH_TOKEN);
                        }

                        processQueue(e, null);
                        reject(e);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(e);
    },
);

export default configure({ axios, cache });
