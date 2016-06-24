import React from 'react';

import download from '../api/download';

export default React.createClass({
    displayName: 'Export',

    propTypes: {
        targetId: React.PropTypes.string.isRequired,
        dataset: React.PropTypes.object.isRequired,
    },

    _makeFilename(extension) {
        const filename = this.props.dataset.label;
        return [(`${filename}_export`).replace(/\s/g, '_'), extension].join('.');
    },

    downloadPNG() {
        const filename = this._makeFilename('png');
        download.downloadPNG(this.props.targetId, filename);
    },

    downloadSVG() {
        const filename = this._makeFilename('svg');
        download.downloadSVG(this.props.targetId, filename);
    },

    render() {
        return (
            <div>
                <button className="btn btn--block" onClick={this.downloadPNG}>Download Image</button>
                <button className="btn btn--block" onClick={this.downloadSVG}>Download SVG</button>
            </div>
        );
    },
});
