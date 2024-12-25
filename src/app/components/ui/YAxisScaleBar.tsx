'use client';

import { useI18n } from "@/app/context/i18nContext";
import { useVisibleLines } from "@/app/[lang]/data-chart/context/visibleLinesContext";
import { useYAxisScale, YAxisScale } from "@/app/[lang]/data-chart/context/yAxisScaleContext";
import Slider from "@mui/material/Slider";
import "@/app/styles/TextFieldStyles.css";

const YAxisScaleBar = () => {
  const { states, setStates } = useVisibleLines();
  const { scale, setScales } = useYAxisScale();
  const { dictionary } = useI18n();

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
        {Object.keys(states).map((key) => (
          <div key={key} className="flex flex-col space-y-2">
            <p className="font-semibold">{`${dictionary[key] || key}`}</p>
            <Slider
              min={0}
              max={20000}
              value={[
                scale[key as keyof YAxisScale].min,
                scale[key as keyof YAxisScale].max
              ]}
              step={scale?.[key as keyof YAxisScale]?.isDecimal ? 0.1 : 1000}
              onChange={(event, value) => handleSliderValueChange(key as keyof YAxisScale, value as [number, number])}
              valueLabelDisplay="auto"
              sx={{ width: 200 }}
            />
          </div>  
        ))}
      </div>
    </div>
  );
};

export default YAxisScaleBar;
