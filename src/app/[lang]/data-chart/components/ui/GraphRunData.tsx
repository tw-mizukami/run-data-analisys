"use client"

import RunDataChart from "@/app/[lang]/data-chart/components/ui/RunDataRecharts";
import { useGraphRunData } from "../../hooks/useGraphRunData";
import { sampleRunData } from "@/app/consts/sampleRunData";
import { overlayStyle } from "@/app/styles/OverlayStyle";
import { useI18n } from "@/app/context/i18nContext";
import { useVisibleLinesState } from "../../context/visibleLinesStateContext";
import { chartLinesDataKey } from "@/app/types/chartLinesDatakeys";

function GraphRunData() {
  const { data, isDataValid } = useGraphRunData();
  const { states: visibleLines } = useVisibleLinesState();
  const { dictionary } = useI18n();
  const linesName: Record<chartLinesDataKey, string> = {
    Data1: dictionary.Data1,
    Data2: dictionary.Data2,
    Data3: dictionary.Data3,
    Data4: dictionary.Data4,
    Data5: dictionary.Data5,
    Data6: dictionary.Data6,
    Data7: dictionary.Data7,
    Data8: dictionary.Data8,
  };

  return (
    <div>
      {isDataValid ? (
        <RunDataChart
          title={dictionary.grahTitle}
          visivleLinesState={visibleLines}
          linesName={linesName}
          data={data}
        />  
      ) : (
        <div className='relative'>
          <div style={overlayStyle}>sample</div>
            <RunDataChart
              title='Sample Graph'
              visivleLinesState={visibleLines}
              linesName={linesName}
              data={sampleRunData}
            />
          </div>
      )}
    </div>
  );

}

export default GraphRunData;