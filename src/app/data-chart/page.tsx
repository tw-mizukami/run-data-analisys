import React from 'react';
import { sampleRunData } from '../consts/sampleRunData';
import RunDataChart from '../components/ui/RunDataRecharts';

const DataChart = () => {
    return (
        <>
          <RunDataChart data={sampleRunData} visibleLines={{
            speed: true,
            noInspRate: true,
            dataA: true,
            dataB: true,
            dataC: true,
            dataD: true,
            dataE: true,
          }}>
          </RunDataChart>
        </>
    );
};

export default DataChart;
