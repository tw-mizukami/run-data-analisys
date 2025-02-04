"use client"

import { Locale } from '@/i18n-config';
import { VisibleLinesProvider } from "../../context/visibleLinesContext";
import { GraphDataSelector } from "@/app/components/ui/GraphDataSelector";
import RunDataChart from "@/app/components/ui/RunDataRecharts";
import ToggleLineChartButton from "@/app/components/ui/ToggleLineChartButton";
import { getDictionary } from '../../get-dictionary';
import { useEffect, useState } from 'react';
import YAxisScaleBar from '@/app/components/ui/YAxisScaleBar';
import { YAxisScaleProvider } from '../../context/yAxisScaleContext';
import { useRunDataStore } from '@/app/data/rechartsRunData'
import { sampleRunData } from '@/app/consts/sampleRunData';
import { GetToChartData } from '@/app/components/ConvertCsvToChartData';

interface GraphRunDataProps {
  params: Promise<{ lang: Locale }>;
}

function GraphRunData({ params }: GraphRunDataProps) {
  const [dictionary, setDictionary] = useState<any>(null);
  const [lang, setLang] = useState<string | null>(null);
  const { data, setData } = useRunDataStore();
  const isDataValid = !data || data.length;
  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    backgroundColor: "rgba(0, 255, 234, 0.4)",
    color: "white",
    padding: "20px 100px",
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "8px",
    pointerEvents: "none",
  };

  // PCからデータ受信
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
    }

    fetchData();
  }, []);

  // 波形データの更新
  useEffect(() => {
    console.log(data);
  }, [data]);

  // 言語切替処理
  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const resolvedParams = await params;
        const { lang } = resolvedParams;
        setLang(lang);
        const result = await getDictionary(lang);
        setDictionary(result);
      } catch (error) {
        console.error("Failed to fetch dictionary:", error);
      }
    };

    fetchDictionary();
  }, [params]);

  // ローディング中の表示
  if (!dictionary || !lang) {
    return <div>Loading...</div>; 
  }

  return (
    
    <YAxisScaleProvider lang={lang}>
      <VisibleLinesProvider lang={lang}>

        <div className="flex flex-row space-x-4 mt-4 mb-4 ml-4">
          
          <div className="flex flex-col space-x-4 mt-4 mb-4">
            {isDataValid ? (
              <RunDataChart data={data} />  
            ) : (
              <div className='relative'>
                <div style={overlayStyle}>sample</div>
                  <RunDataChart data={sampleRunData} />
              </div>
            )}
            <GraphDataSelector />
          </div>
         
          <div className="flex flex-row space-x-4 mt-10">
            <div>
              <ToggleLineChartButton />
            </div>
            <div>
              <YAxisScaleBar />
            </div>
          </div>
        </div>

      </VisibleLinesProvider>
    </YAxisScaleProvider>
  );
}

export default GraphRunData;
