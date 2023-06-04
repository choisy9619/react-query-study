'use strict';

const BrowserEnvironment = require('jest-environment-jsdom');

class CustomEnvironment extends BrowserEnvironment {
    constructor(config) {
        super(
            Object.assign({}, config, {
                globals: Object.assign({}, config.globals, {
                    ArrayBuffer: ArrayBuffer,
                    Uint32Array: Uint32Array,
                    Uint8Array: Uint8Array,
                }),
            }),
        );
    }

    async setup() {}

    async teardown() {}
}

module.exports = CustomEnvironment;
