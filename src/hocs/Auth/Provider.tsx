import dayJs from 'dayjs';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import { ACCESS_TOKEN, LOGIN_URL, LOGOUT_URL } from '@/constants';
import { useAxiosGet } from '@/hooks';
import type {
    AuthContextValue,
    Children,
    StringObject,
    UserData,
} from '@/interfaces';

const AuthContext = createContext(null as unknown as AuthContextValue);
export const useAuth = () => useContext(AuthContext);

export const Provider = (Component: Children) => {
    const { children } = Component;
    const router = useRouter();
    const { pathname } = router;
    const { data, exec } = useAxiosGet({ url: '' });
    const [isCheckedState, setIsChecked] = useState(false);
    const [userDataState, setUserData] = useState(null);

    const loadUser = async () => {
        const accessToken = await Cookies.get(ACCESS_TOKEN);

        if (!!accessToken) {
            try {
                const id = (jwtDecode(accessToken) as unknown as StringObject)
                    ?.user;

                await exec({
                    url: '/example/api/user-info',
                });
            } catch (e) {
                console.error(e);
            }
        }

        setTimeout(() => {
            setIsChecked(true);
        });
    };

    useEffect(() => {
        loadUser().catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (!!data && !_.isEqual(data, userDataState)) {
            setUserData(data);
        } else if (_.isEqual(data, userDataState)) {
            setIsChecked(true);
        }
    }, [data, userDataState]);

    useEffect(() => {
        const accessToken = Cookies.get(ACCESS_TOKEN);

        if (
            !!accessToken &&
            isCheckedState &&
            pathname !== LOGIN_URL &&
            pathname !== LOGOUT_URL
        ) {
            try {
                const expire = (
                    jwtDecode(accessToken) as unknown as StringObject
                )?.exp;

                if (
                    dayJs(new Date()).unix() >= Number(expire) ||
                    pathname.includes('/example/url/protected')
                ) {
                    loadUser().catch((e) => console.error(e));
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [pathname]);

    return (
        <AuthContext.Provider
            value={{
                isChecked: isCheckedState,
                isLoggedIn: !!Cookies.get(ACCESS_TOKEN)
                    ? !!userDataState
                    : false,
                user: !!Cookies.get(ACCESS_TOKEN)
                    ? (userDataState as unknown as UserData)
                    : (null as unknown as UserData),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
