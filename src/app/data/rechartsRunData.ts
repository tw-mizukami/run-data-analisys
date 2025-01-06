import { create } from "zustand";
import { runDataChartType } from "../types/runDataChartType";

type RunDataStore = {
  data: runDataChartType[];
  setData: (newData: runDataChartType[]) => void;
};

export const useRunDataStore = create<RunDataStore>((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));
