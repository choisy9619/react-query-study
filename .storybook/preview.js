import { Global, ThemeProvider } from '@emotion/react';
import * as nextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import I18nProvider from 'next-translate/I18nProvider';

import theme from 'src/styles/theme';
import globalStyles from 'src/styles/global';
import common from 'locales/ko/common.json';

export const decorators = [
    (Story) => (
        <I18nProvider lang="ko" namespaces={{ common }}>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyles} />
                <Story />
            </ThemeProvider>
        </I18nProvider>
    ),
];

export const parameters = {
    layout: 'fullscreen',
    nextRouter: {
        Provider: RouterContext.Provider,
        asPath: '/',
        path: '/',
        push() {},
        query: {},
    },
    options: {
        storySort: (a, b) => {
            if (b[1].kind === 'Welcome') {
                return 1;
            }

            return a[1].kind === b[1].kind
                ? 0
                : a[1].id.localeCompare(b[1].id, { numeric: true });
        },
    },
};

Object.defineProperty(nextImage, 'default', {
    configurable: true,
    value: (props) => (
        <div>
            <img
                alt=""
                style={{
                    height: 'auto',
                    width: '100%',
                }}
                {...props}
            />
        </div>
    ),
});
