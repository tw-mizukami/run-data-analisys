"use client";

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
  visibleLines: {
    speed: boolean;
    noInspRate: boolean;
    dataA: boolean;
    dataB: boolean;
    dataC: boolean;
    dataD: boolean;
    dataE: boolean;
  };
}

const pStyle = {
  color: "blue",
};

const divStyle = {
  background: "linear-gradient(to right, #fff, #fff8)",
  fontWeight: "bold",
  border: "solid 2px blue",
};

function RunDataChart({ data, visibleLines }: RechartsGraphProps) {
  // カンマ区切りのフォーマット関数
  const formatNumber = (value: number) => value.toLocaleString();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // サーバー側では表示させない
  }
  
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  return (
    <div>
      <h2>運転速度/未検査グラフ</h2>
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
        <CartesianGrid strokeDasharray="5 1" />
        <XAxis
          dataKey="date"
          interval={5}
          angle={-20}
          dx={-10}
          dy={20}
          tick={{
            fontSize: 10,
            fill: "#000",
            cursor: "pointer",
          }}
        />
        <YAxis
          yAxisId="left"
          domain={["auto", "auto"]}
          tickCount={10}
          tickFormatter={formatNumber}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={["auto", "auto"]}
          tickCount={10}
        />
        {/* <YAxis
          yAxisId="custom"
          orientation="right"
          domain={["auto", "auto"]}
          tickCount={10}
        /> */}

        {visibleLines.speed && (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="speed"
            name="運転速度"
            stroke="#3ba2f6"
            unit="pcs/min"
          />
        )}

        {visibleLines.noInspRate && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="noInspRate"
            name="未検査率"
            stroke="#ff0091"
            strokeWidth={2}
            unit="%"
            activeDot={{
              cursor: "pointer",
            }}
          />
        )}
        {visibleLines.dataA && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="dataA"
              name="dataA"
              stroke="#00ff7f"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.dataB && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="dataB"
              name="dataB"
              stroke="#7f00ff"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.dataC && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="dataC"
              name="dataC"
              stroke="#ff7f00"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.dataD && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="dataD"
              name="dataD"
              stroke="#66ff00"
              strokeWidth={2}
              unit="%"
              activeDot={{
                cursor: "pointer",
              }}
          />
        )}
        {visibleLines.dataE && (
          <Line
              yAxisId="right"
              type="monotone"
              dataKey="dataE"
              name="dataE"
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
