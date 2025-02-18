import { chartLinesDataKey } from "./chartLinesDatakeys";

export type runDataConfig = {
  data :number | null;
};

export type runData = Record<chartLinesDataKey, runDataConfig>;

export type runDataChartType = {
  date: string | null;
  runData: runData;
};