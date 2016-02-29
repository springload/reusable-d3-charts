import React from 'react';

import Export from '../components/Export';
import BasicLineChart from '../components/BasicLineChart';
import FormattedChart from '../components/FormattedChart';

import datasets from '../datasets';

const STEP = 1;
const MIN = 0;
const MAX = datasets.length - STEP;

export default React.createClass({
    displayName: 'App',

    getInitialState() {
        return {
            activeDatasetIndexes: [0, 1],
        };
    },

    changeActiveDataset(index, e) {
        const { activeDatasetIndexes } = this.state;
        const newActiveDatasets = activeDatasetIndexes.slice();

        newActiveDatasets[index] = parseInt(e.target.value, 10);

        this.setState({
            activeDatasetIndexes: newActiveDatasets,
        });
    },

    render() {
        const { activeDatasetIndexes } = this.state;
        const activeDatasets = activeDatasetIndexes.map(i => datasets[i]);

        return (
            <div className="app">
                <h1>Reusable D3 charts</h1>
                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <BasicLineChart id="basic-line-chart-wrapper" data={activeDatasets[0].data}/>
                        <h4>{activeDatasets[0].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="#" className="u-block"><h3>Basic line chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[0]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 0)}
                            onClick={this.changeActiveDataset.bind(this, 0)}
                        />
                        <Export targetId="basic-line-chart-wrapper" dataset={activeDatasets[0]}/>
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <FormattedChart id="formatted-chart-wrapper" data={activeDatasets[1].data}/>
                        <h4>{activeDatasets[1].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="#" className="u-block"><h3>Formatted line chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[1]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 1)}
                            onClick={this.changeActiveDataset.bind(this, 1)}
                        />
                        <Export targetId="formatted-chart-wrapper" dataset={activeDatasets[1]}/>
                    </div>
                </div>
            </div>
        );
    },
});
