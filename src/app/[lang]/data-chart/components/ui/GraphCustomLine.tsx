import { Line } from "recharts";

type GraphCustomLineProps = {
  yAxisId: string;
  dataKey: string;
  name: string;
  stroke: string;
  unit?: string;
};

const GraphCustomLine = ({ yAxisId, dataKey, name, stroke, unit }: GraphCustomLineProps) => {
  return (
    <Line
      yAxisId={yAxisId}
      type="monotone"
      dataKey={dataKey}
      name={name}
      stroke={stroke}
      strokeWidth={2}
      unit={unit}
      activeDot={{ cursor: "pointer" }}
    />
  );
};

export default GraphCustomLine;