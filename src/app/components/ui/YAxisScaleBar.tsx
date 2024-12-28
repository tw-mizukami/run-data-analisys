'use client';

import { useI18n } from "@/app/context/i18nContext";
import { useVisibleLines } from "@/app/[lang]/data-chart/context/visibleLinesContext";
import { useYAxisScale, YAxisScale } from "@/app/[lang]/data-chart/context/yAxisScaleContext";
import Slider from "@mui/material/Slider";
import "@/app/styles/TextFieldStyles.css";
import { useEffect } from "react";
import Button from "./Button";

const YAxisScaleBar = () => {
  const { states, setStates } = useVisibleLines();
  const { scale, setScales } = useYAxisScale();
  const { dictionary } = useI18n();

    useEffect(() => {
    console.log("Initial scale state:", scale);
}, []);

useEffect(() => {
    console.log("Scale updated:", scale);
}, [scale]);
  
  const handleSliderValueChange = (key: keyof YAxisScale, value: [number, number]) => {
    if (Array.isArray(value) && value.length === 2) {
      console.log(`Key: ${key}`);
      console.log(`Min: ${value[0]}, Max: ${value[1]}`);
      setScales(key, { min: value[0], max: value[1] });
    } else {
      console.error("Value is not a valid range:", value);
    }
  };


  
  return (
   <div className="relative border border-blue-500 rounded-lg p-4 mt-6">
      <div className="absolute -top-3 left-4 bg-black px-2 text-white font-semibold">
        {dictionary.YAxisScale}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row space-x-4">
          <p className="font-semibold">{`${dictionary['Data1']}`}</p>
          <div className="flex flex-col space-y-4">
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
              <Button label="Auto" size="sm" assign="primary" onClick={() => { }} />
            </div>
        </div>
        <div className="flex flex-row space-x-4">
          <p className="font-semibold">{`${dictionary['Data2']}`}</p>
            <div className="flex flex-col space-y-4"></div>
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
              <Button label="Auto" size="sm" assign="primary" onClick={() => { }} />
            </div>
          </div>
        {/* {Object.keys(states).map((key) => (
          <div key={key} className="flex flex-col space-y-2">
            <p className="font-semibold">{`${dictionary[key] || key}`}</p>
            {scale[key as keyof YAxisScale] && (
            <Slider
              min={scale[key as keyof YAxisScale].sliderMin}
              max={scale[key as keyof YAxisScale].sliderMax}
              value={[
                scale[key as keyof YAxisScale].min,
                scale[key as keyof YAxisScale].max
              ]}
              step={scale[key as keyof YAxisScale].sliderStep}
              onChange={(event, value) => handleSliderValueChange(key as keyof YAxisScale, value as [number, number])}
              valueLabelDisplay="auto"
              sx={{ width: 200 }}
              />
              )}
          </div>  
        ))} */}
      </div>
    </div>
  );
};

export default YAxisScaleBar;
