"use client"

import { Locale } from '@/i18n-config';
import { YAxisScaleProvider } from '../../context/yAxisScaleContext';
import { VisibleLinesProvider } from "../../context/visibleLinesContext";
import GraphRunData from './GraphRunData';
import { GraphDataSelector } from "@/app/components/ui/GraphDataSelector";
import ToggleLineChartButton from "@/app/components/ui/ToggleLineChartButton";
import YAxisScaleBar from '@/app/components/ui/YAxisScaleBar';
import { useDictionary } from '../../hooks/useDictionary';

interface GraphRunDataProps {
    params: Promise<{ lang: Locale }>;
}

function DataGraph({ params }: GraphRunDataProps) {
  const { dictionary, lang } = useDictionary(params);
  
  // ローディング中の表示
  if (!dictionary || !lang) {
    return <div>Loading...</div>; 
  }

  return (
    
    <YAxisScaleProvider lang={lang}>
      <VisibleLinesProvider lang={lang}>
        
        <div className="flex flex-row space-x-4 mt-4 mb-4 ml-4">  
          <div className="flex flex-col space-x-4 mt-4 mb-4">
            <GraphRunData />
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

export default DataGraph;
