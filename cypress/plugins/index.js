/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const http = require('http');
const next = require('next');
const nock = require('nock');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
    const app = next({ dev: true });
    const handleNextRequests = app.getRequestHandler();
    await app.prepare();

    const customServer = new http.Server(async (req, res) => {
        return handleNextRequests(req, res);
    });

    await new Promise((resolve, reject) => {
        customServer.listen(3001, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });

    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
            launchOptions.args.push('--disable-gpu');

            return launchOptions;
        }
    });

    on('task', {
        clearNock() {
            nock.restore();
            nock.cleanAll();

            return null;
        },

        async nock({ body, method, path, statusCode }) {
            nock.activate();
            method = method.toLowerCase();
            nock(process.env.CYPRESS_DOMAIN, { allowUnmocked: true })
                [method](path)
                .reply(statusCode, body);

            return null;
        },
    });

    return config;
};
