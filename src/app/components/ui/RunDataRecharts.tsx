// グラフ

"use client";

import { useVisibleLines } from "@/app/[lang]/data-chart/context/visibleLinesContext";
import { useYAxisScale } from "@/app/[lang]/data-chart/context/yAxisScaleContext";
import { useI18n } from "@/app/context/i18nContext";
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

function RunDataChart({ data }: RechartsGraphProps) {
  // カンマ区切りのフォーマット関数
  const formatNumber = (value: number) => value.toLocaleString();
  const [isClient, setIsClient] = useState(false);
  const { states: visibleLines } = useVisibleLines();
  const { scale: yAxisScale } = useYAxisScale(); 
  
  const { dictionary } = useI18n();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    console.log("Updated yAxisScale:", yAxisScale);
  }, [yAxisScale]); // yAxisScale に依存
  
  
  if (!isClient) {
    return <div>Loading...</div>;
  }
  
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white text-center bg-gradient-to-r from-blue-800 to-blue-600 py-4 px-6 rounded-lg shadow-lg">
        {dictionary.grahTitle}
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
            yAxisScale.Data1.min !== undefined ? yAxisScale.Data1.min : "auto",
            yAxisScale.Data1.max !== undefined ? yAxisScale.Data1.max : "auto",
          ]}
          allowDataOverflow
          tickCount={10}
          tickFormatter={formatNumber}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[
            yAxisScale.Data2.min !== undefined ? yAxisScale.Data2.min : "auto",
            yAxisScale.Data2.max !== undefined ? yAxisScale.Data2.max : "auto",
          ]}
          tickCount={10}
        />
        {/* <YAxis
          yAxisId="custom"
          orientation="right"
          domain={["auto", "auto"]}
          tickCount={10}
        /> */}

        {visibleLines.Data1 && (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Data1"
            name={dictionary.data1}
            stroke="#3ba2f6"
            unit="pcs/min"
          />
        )}

        {visibleLines.Data2 && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Data2"
            name={dictionary.data2}
            stroke="#ff0091"
            strokeWidth={2}
            unit="%"
            activeDot={{
              cursor: "pointer",
            }}
          />
        )}
        {visibleLines.Data3 && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="Data3"
              name={dictionary.data3}
              stroke="#00ff7f"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.Data4 && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="Data4"
              name={dictionary.data4}
              stroke="#7f00ff"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.Data5 && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="Data5"
              name={dictionary.data5}
              stroke="#ff7f00"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.Data6 && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="Data6"
              name={dictionary.data6}
              stroke="#66ff00"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.Data7 && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="Data7"
              name={dictionary.data7}
              stroke="#66ffff"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
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
