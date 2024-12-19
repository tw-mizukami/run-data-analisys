"use client";

import Papa from "papaparse";
import { runDataChartType } from "../types/runDataChartType";

const ConvertCsvToChartData = (file: File): Promise<runDataChartType[]> => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      const errorMessage = "The provided file is not of type 'Blob'.";
      console.error(errorMessage, file);
      reject(new TypeError(errorMessage));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          try {
            const data = result.data.map((row) => {
              const rowData = row as Record<string, any>;
              const date = rowData[Object.keys(rowData)[0]];
              const speed = rowData[Object.keys(rowData)[37]] ? parseFloat(rowData[Object.keys(rowData)[37]]) : null;
              const noInspRate = rowData[Object.keys(rowData)[38]] ? parseFloat(rowData[Object.keys(rowData)[38]]) : null;

              return date ? { date, Data1: speed, Data2: noInspRate } as runDataChartType : null;
            }).filter((item) => item !== null) as runDataChartType[];

            resolve(data);
          } catch (parseError) {
            reject(parseError);
          }
        },
        error: (error: unknown) => {
          if (error instanceof Error) {
            reject(error);
          } else {
            reject(new Error("Unknown parsing error"));
          }
        },
      });
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file, 'Shift_JIS');
  });
};

export default ConvertCsvToChartData;
