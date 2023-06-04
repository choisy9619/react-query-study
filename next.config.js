const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const ForkTsCheckerPlugin = require('hard-source-webpack-plugin');
const HardSourcePlugin = require('hard-source-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const nextTranslate = require('next-translate');
const withTM = require('next-transpile-modules')();

module.exports = withPlugins(
    [nextTranslate, withBundleAnalyzer, withPWA, withTM],
    {
        async rewrites() {
            return [
                {
                    destination:
                        process.env.DEPLOYMENT_ENV === 'cypress' ||
                        process.env.DEPLOYMENT_ENV === 'local'
                            ? process.env.LOCAL_DESTINATION_URL
                            : process.env.DEPLOYMENT_ENV === 'development'
                            ? process.env.DEVELOPMENT_DESTINATION_URL
                            : process.env.DEPLOYMENT_ENV === 'test'
                            ? process.env.TEST_DESTINATION_URL
                            : process.env.PRODUCTION_DESTINATION_URL,
                    source: process.env.SOURCE_PATH,
                },
            ];
        },
        devIndicators: {
            autoPrerender: false,
        },
        env: {
            CYPRESS_API_URL: process.env.CYPRESS_API_URL,
            CYPRESS_DOMAIN: process.env.CYPRESS_DOMAIN,
            DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,
            DEVELOPMENT_API_URL: process.env.DEVELOPMENT_API_URL,
            DEVELOPMENT_DESTINATION_URL:
                process.env.DEVELOPMENT_DESTINATION_URL,
            DEVELOPMENT_DOMAIN: process.env.DEVELOPMENT_DOMAIN,
            LOCAL_API_URL: process.env.LOCAL_API_URL,
            LOCAL_DOMAIN: process.env.LOCAL_DOMAIN,
            LOCAL_DESTINATION_URL: process.env.LOCAL_DESTINATION_URL,
            PRODUCTION_API_URL: process.env.PRODUCTION_API_URL,
            PRODUCTION_DESTINATION_URL: process.env.PRODUCTION_DESTINATION_URL,
            PRODUCTION_DOMAIN: process.env.PRODUCTION_DOMAIN,
            SOURCE_PATH: process.env.SOURCE_PATH,
            TEST_API_URL: process.env.TEST_API_URL,
            TEST_DESTINATION_URL: process.env.TEST_DESTINATION_URL,
            TEST_DOMAIN: process.env.TEST_DOMAIN,
        },
        plugins: [new ForkTsCheckerPlugin(), new HardSourcePlugin()],
        poweredByHeader: false,
        pwa: {
            runtimeCaching,
            buildExcludes: [/middleware-manifest.json$/],
            dest: 'public',
            disable: process.env.NODE_ENV !== 'production',
        },
        rules: [
            {
                exclude: /node_modules/,
                loader: [
                    {
                        loader: 'ts-loader',
                        options: {
                            experimentalWatchApi: true,
                            transpileOnly: true,
                        },
                    },
                ],
                test: /\.tsx?$/,
            },
        ],
        webpack: (config, { dev, isServer }) => {
            config.module.rules.push({
                exclude: /node_modules/,
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-transform-runtime'],
                        presets: ['@babel/preset-env'],
                    },
                },
            });

            if (
                isServer &&
                process.env.DEPLOYMENT_ENV === process.env.NODE_ENV
            ) {
                require('./scripts/generate-sitemap');
            }

            if (dev) {
                config.devtool = 'cheap-module-source-map';

                Object.assign(config.optimization, {
                    removeAvailableModules: false,
                    removeEmptyChunks: false,
                    splitChunks: false,
                });

                Object.assign(config.output, {
                    pathinfo: false,
                });
            }

            return config;
        },
        webpack5: true,
    },
);
