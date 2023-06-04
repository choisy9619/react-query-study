import { useRouter } from 'next/router';
import type { ComponentType } from 'react';
import { useEffect } from 'react';

import { LOGIN_URL, REFERRER } from '@/constants';
import { useAuth } from '@hocs/Auth';

const withProtection = (Component: ComponentType<object>) => () => {
    const router = useRouter();
    const { isChecked, isLoggedIn } = useAuth() ?? {};

    useEffect(() => {
        if (isChecked && !isLoggedIn) {
            sessionStorage.setItem(REFERRER, router.asPath);
            router.push(LOGIN_URL);
        }
    }, [isChecked, isLoggedIn]);

    return isChecked && isLoggedIn ? <Component /> : <></>;
};

export default withProtection;
