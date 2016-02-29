import React from 'react';
import d3 from 'd3';

import saveSvgAsPng from 'save-svg-as-png';

export default React.createClass({
    displayName: 'Export',

    propTypes: {
        targetClassName: React.PropTypes.string.isRequired,
    },

    _makeFilename(extension) {
        var filename = this.props.dataset.label;
        return [(filename + '_export').replace(/\s/g, '_'), extension].join('.');
    },

    downloadPNG() {
        const filename = this._makeFilename('png');
        const node = document.querySelector(`.${this.props.targetClassName}`).querySelector('svg');
        saveSvgAsPng.saveSvgAsPng(node, filename, { scale: 2.0 });
    },

    downloadSVG() {
        const filename = this._makeFilename('svg');
        const node = document.querySelector(`.${this.props.targetClassName}`).querySelector('svg');

        saveSvgAsPng.svgAsDataUri(node, {}, (uri) => {
            var a = document.createElement('a');
            a.download = filename;
            a.href = uri;
            //a.href = this.createSVGFile(node);
            document.body.appendChild(a);
            a.addEventListener('click', (e) => {
                a.parentNode.removeChild(a);
            });
            a.click();
        });
    },

    render() {
        return (
            <div>
                <button onClick={this.downloadPNG}>Download Image</button>
                <button onClick={this.downloadSVG}>Download SVG</button>
            </div>
        );
    },
});
