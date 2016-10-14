/**
 * Reusable analytics tracking glue.
 */

// Layer between our analytics calls and GA.
const analyticsTrack = (...args) => {
    if (global.ga) {
        global.ga(...args);
    } else {
        console.log('Error: missing `ga` object', ...args);
    }
};

const analyticsException = message => analyticsTrack('send', 'exception', { exDescription: message, exFatal: false });

// To be called at the top of the JS entry point.
export function initErrorTracking() {
    const oldOnError = global.onerror;

    global.onerror = function onerror(message, file, line, column) {
        const ignoreError = message.indexOf('Script error.') !== -1;
        let ret = false;

        if (oldOnError) {
            // Call any previously assigned handler
            // eslint-disable-next-line prefer-rest-params
            ret = oldOnError.apply(this, arguments);
        }

        if (!ignoreError) {
            analyticsException(`${file}: ${message} (${line}:${column})`);
        }

        return ret;
    };
}

export const errors = {
    download(type, reason) {
        analyticsException(`Download error: ${type} (${reason})`);
    },
};
