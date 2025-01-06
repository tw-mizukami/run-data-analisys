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
              const Data1 = parseFloat(rowData[Object.keys(rowData)[37]]);
              const Data2 = parseFloat(rowData[Object.keys(rowData)[38]]);
              const totalCount = parseInt(rowData[Object.keys(rowData)[30]]);
              const Data3 =  totalCount * parseFloat(rowData[Object.keys(rowData)[31]]) / 100;
              const Data4 =  totalCount * parseFloat(rowData[Object.keys(rowData)[32]]) / 100;
              const Data5 = totalCount * parseFloat(rowData[Object.keys(rowData)[33]]) / 100;
              const Data6 = totalCount * parseFloat(rowData[Object.keys(rowData)[34]]) / 100;
              const Data7 = totalCount * parseFloat(rowData[Object.keys(rowData)[35]]) / 100;
              const Data8 = totalCount * parseFloat(rowData[Object.keys(rowData)[36]]) / 100;

              return date ? { date, Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8} as runDataChartType : null;
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
