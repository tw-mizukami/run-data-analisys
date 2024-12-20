'use client';

import Slider from "@mui/material/Slider/Slider";

const SliderBar = () => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue);
  };

  return (
    <Slider
      defaultValue={30}
      onChange={handleChange}
      sx={{width: 300}}
    />
  );
};

export default SliderBar;

