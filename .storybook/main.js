const path = require('path');

const resolvePath = (_path) => path.join(process.cwd(), _path);

module.exports = {
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-next-router',
    ],
    stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
    webpackFinal: async (config) => {
        config.resolve.modules = [
            path.resolve(__dirname, '..'),
            'node_modules',
        ];

        config.resolve.alias = {
            ...config.resolve.alias,
            '@emotion/core': resolvePath('node_modules/@emotion/react'),
            '@emotion/styled': resolvePath('node_modules/@emotion/styled'),
            'emotion-theming': resolvePath('node_modules/@emotion/react'),
        };

        return config;
    },
};
