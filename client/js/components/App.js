import React from 'react';

import LineChart from '../components/LineChart';

import datasets from '../datasets';

export default React.createClass({
    displayName: 'App',

    getInitialState() {
        return {
            activeDataset: 0,
        };
    },

    changeActiveDataset(e) {
        this.setState({
            activeDataset: parseInt(e.target.value, 10),
        });
    },

    render() {
        const { activeDataset } = this.state;

        return (
            <div className="app">
                <input
                    type="range"
                    value={activeDataset}
                    max={datasets.length - 1}
                    min={0}
                    step={1}
                    onChange={this.changeActiveDataset}
                    onClick={this.changeActiveDataset}
                />

                <LineChart data={datasets[activeDataset].data}/>
            </div>
        );
    },
});
