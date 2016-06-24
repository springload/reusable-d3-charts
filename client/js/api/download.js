import saveSvgAsPng from 'save-svg-as-png';

import { errors } from '../api/analytics';
import dataURItoBlob from '../utils/dataURItoBlob';

// https://stackoverflow.com/questions/17907445/how-to-detect-ie11
const IS_IE11 = !(global.ActiveXObject) && 'ActiveXObject' in global;

const getSVGNode = (id) => {
    const node = document.querySelector(`#${id} svg`);

    // Within an if because IE/Edge does not support innerHTML on SVG elements.
    if (node.innerHTML) {
        // Safari has some issues with xlink:href namespaces for use and a tags.
        // http://stackoverflow.com/questions/30273775/namespace-prefix-ns1-for-href-on-tagelement-is-not-defined-setattributens
        node.innerHTML = node.innerHTML.replace(/NS\d+:href/g, 'xlink:href');
    }

    return node;
};

const supportAlert = (type, code) => {
    const message = {
        IE11: 'Your browser does not support PNG export. Please try SVG export, or try again with a recent version of Mozilla Firefox or Google Chrome.',
        msSaveOrOpenBlob: 'Your browser has image export bugs. For the best result, please use a recent version of Mozilla Firefox or Google Chrome.',
        exception: 'Your browser does not support image export. Please try again with a recent version of Mozilla Firefox or Google Chrome.',
    };

    global.alert(message[code]);
    errors.download(type, code);
};

const clickURILink = (filename, type, uri) => {
    // The IE / MS Edge way to export an image, because they do not support opening data URIs as pages.
    // https://stackoverflow.com/questions/33154646/data-uri-link-a-href-data-doesnt-work-in-microsoft-edge
    if (global.navigator.msSaveOrOpenBlob) {
        global.navigator.msSaveOrOpenBlob(dataURItoBlob(uri), filename);
        supportAlert(type, 'msSaveOrOpenBlob');
    } else {
        const link = document.createElement('a');

        // For some reason, Safari does not open PNG data uris in another tab.
        if (typeof link.download === 'undefined' && type !== 'PNG') {
            link.target = '_blank';
        }

        link.download = filename;
        link.href = uri;

        document.body.appendChild(link);
        link.addEventListener('click', () => {
            link.parentNode.removeChild(link);
        });

        link.click();
    }
};

const downloadImage = (type, id, filename) => {
    const node = getSVGNode(id);

    try {
        if (type === 'PNG') {
            // Hard fail because of SecurityError bug in IE11.
            if (IS_IE11) {
                supportAlert(type, 'IE11');
            } else {
                saveSvgAsPng.svgAsPngUri(node, { scale: 2.0 }, clickURILink.bind(null, filename, type));
            }
        } else {
            saveSvgAsPng.svgAsDataUri(node, {}, clickURILink.bind(null, filename, type));
        }
    } catch (e) {
        supportAlert(type, 'exception');
    }
};

export default {
    downloadSVG: downloadImage.bind(null, 'SVG'),
    downloadPNG: downloadImage.bind(null, 'PNG'),
};
