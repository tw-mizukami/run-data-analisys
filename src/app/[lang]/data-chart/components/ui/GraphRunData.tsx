"use client"

import RunDataChart from "@/app/components/ui/RunDataRecharts";
import { useGraphRunData } from "../../hooks/useGraphRunData";
import { sampleRunData } from "@/app/consts/sampleRunData";
import { overlayStyle } from "@/app/styles/OverlayStyle";
import { useI18n } from "@/app/context/i18nContext";

function GraphRunData() {
  const { data, isDataValid } = useGraphRunData();
  const { dictionary } = useI18n();
  
  return (
    <div>
      {isDataValid ? (
        <RunDataChart title={dictionary.grahTitle} data={data} />  
      ) : (
        <div className='relative'>
          <div style={overlayStyle}>sample</div>
            <RunDataChart title='Sample' data={sampleRunData} />
          </div>
      )}
    </div>
  );

}

export default GraphRunData;