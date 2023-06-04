import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { SWRConfig } from 'swr';
import { useDebouncedCallback } from 'use-debounce';

import { ONE_POINT_ZERO_ONE, PX, VH, VH_DELAY_TIME, ZERO } from '@/constants';
import { AuthProvider } from '@hocs/Auth';
import { useAxiosFetch } from '@/hooks';
import globalStyles from '@styles/global';
import theme from '@styles/theme';

const App: FC<AppProps> = (props) => {
    const { Component, pageProps } = props;

    const handleDebounceResize = useDebouncedCallback(() => {
        document.documentElement.style.setProperty(
            VH,
            `${window.innerHeight * ONE_POINT_ZERO_ONE}${PX}`,
        );
    }, VH_DELAY_TIME);

    useEffect(() => {
        document.documentElement.style.setProperty(
            VH,
            `${window.innerHeight * ONE_POINT_ZERO_ONE}${PX}`,
        );

        window.addEventListener('resize', handleDebounceResize);

        return () => window.removeEventListener('resize', handleDebounceResize);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            <SkeletonTheme
                baseColor={theme.colors.brightGray}
                highlightColor={theme.colors.whiteGray}
            >
                <SWRConfig
                    value={{
                        errorRetryCount: ZERO,
                        fetcher: useAxiosFetch,
                        revalidateOnFocus: false,
                    }}
                >
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                </SWRConfig>
            </SkeletonTheme>
        </ThemeProvider>
    );
};

export default App;
