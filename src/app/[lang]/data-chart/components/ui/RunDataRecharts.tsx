// グラフ

"use client";

import GraphCustomLine from "@/app/[lang]/data-chart/components/ui/GraphCustomLine";
import { GraphLineConfig } from "@/app/[lang]/data-chart/Config/GraphLineConfig";
import { useVisibleLinesState, VisibleLinesState } from "@/app/[lang]/data-chart/context/visibleLinesStateContext";
import { useYAxisScale } from "@/app/[lang]/data-chart/context/yAxisScaleContext";
import { useI18n } from "@/app/context/i18nContext";
import { chartLinesDataKey } from "@/app/types/chartLinesDatakeys";
import { runDataChartType } from "@/app/types/runDataChartType";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RechartsGraphProps {
  title: string;
  visivleLinesState: Record<chartLinesDataKey, boolean>;
  linesName: Record<chartLinesDataKey, string>;
  data: runDataChartType[];
}

const pStyle = {
  color: "blue",
};

const divStyle = {
  background: "linear-gradient(to right, #fff, #fff8)",
  fontWeight: "bold",
  border: "solid 2px blue",
};

function RunDataChart({ title, visivleLinesState, linesName, data }: RechartsGraphProps) {
  // カンマ区切りのフォーマット関数
  const formatNumber = (value: number) => value.toLocaleString();
  const [isClient, setIsClient] = useState(false);
  const { scale: yAxisScale } = useYAxisScale(); 
  const { dictionary } = useI18n();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
  }, [yAxisScale]);  
  
  
  if (!isClient) {
    return <div>Loading...</div>;
  }
  
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white text-center bg-gradient-to-r from-blue-800 to-blue-600 py-4 px-6 rounded-lg shadow-lg">
        {title}
      </h2> 
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 1" />
        <XAxis
          dataKey="date"
          interval={1}
          angle={0}
          dx={-10}
          dy={20}
          tick={{ fill: 'white', fontSize: 14 }}
        />
      
        <YAxis
          yAxisId="left"
          domain={[
            yAxisScale.Data1.isAuto ? "auto" : yAxisScale.Data1.min,
            yAxisScale.Data1.isAuto ? "auto" : yAxisScale.Data1.max,
          ]}
          allowDataOverflow
          tickCount={10}
          tickFormatter={formatNumber}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[
            yAxisScale.Data2.isAuto ? "auto" : yAxisScale.Data2.min,
            yAxisScale.Data2.isAuto ? "auto" : yAxisScale.Data2.max,
          ]}
          tickCount={10}
        />

        {/* グラフが表示されない */}
        {/* {Object.entries(GraphLineConfig).map(([key, { yAxis, color, unit }]) =>
          visibleLines[key] ? (
            // Lineにすると表示される
            // <Line
            <GraphCustomLine
              key={key}
              yAxisId={yAxis}
              dataKey={key}
              name={dictionary[key]}
              stroke={color}
              unit={unit}
            />
          ) : null
        )} */}
        
        {Object.entries(GraphLineConfig).map(([key, { yAxis, color, unit }]) =>
          visivleLinesState[key as chartLinesDataKey] ? (
            <Line
              key={key} 
              yAxisId={yAxis}
              type="monotone"
              dataKey={key}
              name={linesName[key as chartLinesDataKey]}
              stroke={color}
              strokeWidth={2}
              unit={unit}
              activeDot={{
                cursor: "pointer",
              }}
            />
          ) : null
        )}
          
        <Legend verticalAlign="top" height={30} iconSize={20} iconType="plainline" />
        
        <Tooltip
          formatter={(value: number) => formatNumber(value)}
          contentStyle={divStyle}
          labelStyle={pStyle}
          separator=" "
          cursor={{ stroke: "blue", strokeWidth: 2 }}
        />
      </LineChart>
    </div>
  );
}

export default RunDataChart;
