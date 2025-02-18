// キーを統一的に管理する
export const chartLinesDataKeys = [
  "Data1", "Data2", "Data3", "Data4",
  "Data5", "Data6", "Data7", "Data8",
] as const;

export type chartLinesDataKey = (typeof chartLinesDataKeys)[number];