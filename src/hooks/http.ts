import type { Method as MethodType } from 'axios';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import qs from 'query-string';

import {
    DEVELOPMENT,
    ERROR_URL,
    MESSAGE,
    STATUS_200,
    STATUS_401,
    STATUS_403,
    TYPE_QUERY,
} from '@/constants';
import { Message, Method } from '@enums/common';
import type { UseAxiosWithMethodParams } from '@/interfaces';
import { axios } from '@middlewares/api';

const useAxiosWithMethod =
    (method: MethodType) => (params: UseAxiosWithMethodParams) => {
        const router = useRouter();
        const { hasCatch, isUsingMessage, message, url } = params;

        const [{ data, error, loading, response }, exec] = useAxios(
            {
                method,
                url,
            },
            { manual: true },
        );

        const { t } = useTranslation(MESSAGE);
        const [state, setter] = useState(!!data);
        const [dataState, dataSetter] = useState(data);

        const handler = () => {
            if (state) {
                setter(false);
            }
        };

        useEffect(() => {
            setter(response?.status === STATUS_200);
            dataSetter(response?.data?.result);
        }, [response]);

        useEffect(() => {
            if (state && loading) {
                setter(false);
                dataSetter(undefined);
            }
        }, [loading, state]);

        useEffect(() => {
            if (!!error) {
                const status = error?.response?.status;

                setter(false);

                if (
                    process.env.NODE_ENV !== DEVELOPMENT &&
                    !hasCatch &&
                    status !== STATUS_401 &&
                    status !== STATUS_403
                ) {
                    router.push(
                        `${ERROR_URL}${TYPE_QUERY}${status}`,
                        ERROR_URL,
                    );
                }

                if (isUsingMessage) {
                    alert(
                        message ??
                            error?.response?.data?.error?.message ??
                            t(Message.NETWORK_ERROR),
                    );
                }
            }
        }, [error]);

        return {
            data: dataState,
            error,
            errorCode: error?.response?.data?.error?.code,
            errorStatus: error?.response?.status,
            exec,
            handler,
            isLoading: loading,
            response,
            state,
        } as const;
    };

export const useAxiosDelete = useAxiosWithMethod(Method.DELETE);

export const useAxiosFetch = async (url: string) => {
    return await axios.get(url);
};

export const useAxiosGet = useAxiosWithMethod(Method.GET);
export const useAxiosPatch = useAxiosWithMethod(Method.PATCH);
export const useAxiosPost = useAxiosWithMethod(Method.POST);
export const useAxiosPut = useAxiosWithMethod(Method.PUT);

export const useSwrGet = ({
    hasCatch,
    params,
    url,
}: {
    url: string | null;
    params?: unknown;
    hasCatch?: boolean;
}) => {
    const router = useRouter();

    const { data, error, isValidating, mutate } = useSWR(
        !!url && !!params
            ? `${url}?${qs.stringify(params as Record<string, number>)}`
            : url,
    );

    useEffect(() => {
        const status = error?.response?.status;

        if (
            process.env.NODE_ENV !== DEVELOPMENT &&
            !!error &&
            !hasCatch &&
            status !== STATUS_401 &&
            status !== STATUS_403
        ) {
            router.push(`${ERROR_URL}${TYPE_QUERY}${status}`, ERROR_URL);
        }
    }, [error]);

    return { data: data?.data?.result, error, isValidating, mutate };
};
