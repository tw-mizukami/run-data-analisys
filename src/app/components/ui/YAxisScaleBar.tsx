'use client';

import { useI18n } from "@/app/context/i18nContext";
import SliderBar from "./SliderBar";

const YAxisScaleBar = () => {
  const { dictionary } = useI18n();

  return (
    <div>
      <div>
        <p>Y軸幅</p>
        <SliderBar />
      </div>                 
    </div>
  );
};

export default YAxisScaleBar;
