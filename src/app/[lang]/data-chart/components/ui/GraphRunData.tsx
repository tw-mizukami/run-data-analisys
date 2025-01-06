"use client"

import { Locale } from '@/i18n-config';
import { VisibleLinesProvider } from "../../context/visibleLinesContext";
import { runDataChartType } from "@/app/types/runDataChartType";
import { GraphDataSelector } from "@/app/components/ui/GraphDataSelector";
import RunDataChart from "@/app/components/ui/RunDataRecharts";
import ToggleLineChartButton from "@/app/components/ui/ToggleLineChartButton";
import { getDictionary } from '../../get-dictionary';
import { useEffect, useState } from 'react';
import YAxisScaleBar from '@/app/components/ui/YAxisScaleBar';
import { YAxisScaleProvider } from '../../context/yAxisScaleContext';

interface GraphRunDataProps {
  params: Promise<{ lang: Locale }>;
  data: runDataChartType[];
}

function GraphRunData({ params, data }: GraphRunDataProps) {
  const [dictionary, setDictionary] = useState<any>(null);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const resolvedParams = await params; // `params` を解決
        const { lang } = resolvedParams;
        setLang(lang); // `lang` をローカル状態に保存
        const result = await getDictionary(lang); // 辞書を取得
        setDictionary(result);
      } catch (error) {
        console.error("Failed to fetch dictionary:", error);
      }
    };

    fetchDictionary();
  }, [params]);

  if (!dictionary || !lang) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  return (
    
    <YAxisScaleProvider lang={lang}>
      <VisibleLinesProvider lang={lang}>

        <div className="flex flex-row space-x-4 mt-4 mb-4 ml-4">
          
          <div className="flex flex-col space-x-4 mt-4 mb-4">
            <RunDataChart data={data} />
            <GraphDataSelector />
          </div>
         
          <div className="flex flex-row space-x-4 mt-12">
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
