import { GetToChartData } from "@/app/components/ConvertCsvToChartData";
import { useRunDataStore } from "@/app/data/rechartsRunData";
import { useEffect, useState } from "react";

export const useGraphRunData = () => {
    const { data, setData } = useRunDataStore();
    const isDataValid = !data || data.length;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/receiveClientData");
                if (response.ok) {
                    const jsonResponse = await response.json(); // JSONデータをパース
                    const csvText = jsonResponse.data as string; // JSON内の"data"フィールドを取得
                    const convData = await GetToChartData(csvText);
                    setData(convData);
                }
            } catch (error) {
                console.error("Error fetching machine info:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return {
        data,
        isDataValid,
    };
};
