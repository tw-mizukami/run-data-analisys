import React from 'react';
import { sampleRunData } from '../consts/sampleRunData';
import RunDataChart from '../components/ui/RunDataRecharts';
import Button from '@/components/Button';
import { GraphDataSelector } from '../components/ui/GraphDataSelector';

const DataChart = () => {
    const sendData = async () => {
    };
    
  return (
    <div className="flex flex-col space-x-4 mt-4 mb-4">
     
    <GraphDataSelector/>
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
    </div>
  );
};

export default DataChart;
