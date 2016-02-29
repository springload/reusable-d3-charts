import React from 'react';

import Export from '../components/Export';
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

                <LineChart className="line-chart-wrapper" data={datasets[activeDataset].data}/>

                <Export targetClassName="line-chart-wrapper" dataset={datasets[activeDataset]}/>
            </div>
        );
    },
});
