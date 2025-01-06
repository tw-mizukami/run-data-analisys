'use client';

import { useI18n } from "@/app/context/i18nContext";
import { useYAxisScale, YAxisScale } from "@/app/[lang]/data-chart/context/yAxisScaleContext";
import Slider from "@mui/material/Slider";
import "@/app/styles/TextFieldStyles.css";
import { useEffect } from "react";
import Button from "./Button";

const YAxisScaleBar = () => {
  const { scale, setScales } = useYAxisScale();
  const { dictionary } = useI18n();

  useEffect(() => {
  }, [scale]);
  
  const handleSliderValueChange = (key: keyof YAxisScale, value: [number, number]) => {
    if (Array.isArray(value) && value.length === 2) {
      setScales(key, false, { min: value[0], max: value[1] });
    } else {
      console.error("Value is not a valid range:", value);
    }
  };

  const handleSliderValueChange_Auto = (key: keyof YAxisScale, isAuto: boolean) => {
    setScales(key, true);
  };

  return (
    <div className="relative border border-blue-500 rounded-lg p-4 mt-6">
      <div className="absolute -top-3 left-4 bg-black px-2 text-white font-semibold">
        {dictionary.YAxisScale}
      </div>
      <div className="flex flex-col mb-2">
        <p className="font-semibold">{`${dictionary['Data1']}`}</p>
        <div className="flex flex-row space-x-4">
          {scale['Data1'] && (
            <Slider
              min={scale['Data1'].sliderMin}
              max={scale['Data1'].sliderMax}
              value={[
                scale['Data1'].min,
                scale['Data1'].max
              ]}
              step={scale['Data1'].sliderStep}
              onChange={(event, value) => handleSliderValueChange('Data1', value as [number, number])}
              valueLabelDisplay="auto"
              sx={{ width: 200 }}
              />
          )}
          <Button label="Auto" size="sm" assign="primary" onClick={() => handleSliderValueChange_Auto('Data1', true)} />
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <p className="font-semibold">{`${dictionary['Data2']}`}</p>
        <div className="flex flex-row space-x-4">
          {scale['Data2'] && (
            <Slider
              min={scale['Data2'].sliderMin}
              max={scale['Data2'].sliderMax}
              value={[
                scale['Data2'].min,
                scale['Data2'].max
              ]}
              step={scale['Data2'].sliderStep}
              onChange={(event, value) => handleSliderValueChange('Data2', value as [number, number])}
              valueLabelDisplay="auto"
              sx={{ width: 200 }}
              />
          )}
          <Button label="Auto" size="sm" assign="primary" onClick={() => handleSliderValueChange_Auto('Data2', true)} />
        </div>
      </div>
    </div>
  );
};

export default YAxisScaleBar;
