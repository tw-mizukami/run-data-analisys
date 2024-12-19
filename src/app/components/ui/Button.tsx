//
// 標準ボタン
//
import React from 'react';

interface ButtonProps {
  label: string;
  size?:"sm" | "md" | "lg";
  assign?: "primary" | "secondary" | "outline";
  onClick: () => void;
}

const Size = {
  sm: "w-10 h-5",
  md: "w-30 h-10",
  lg: "w-40 h-20",
};

const Assign = {
  primary: "bg-blue-100 text-blue-800 hover:bg-blue-400 focus:bg-blue-200 dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20",
  secondary: "bg-green-100 text-green-800 hover:bg-green-400 focus:bg-green-200 dark:text-green-400 dark:bg-green-800/30 dark:hover:bg-green-800/20 dark:focus:bg-green-800/20",
  outline: "bg-red-100 text-red-800 hover:bg-red-400 focus:bg-red-200 dark:text-red-400 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20",
};

const Button: React.FC<ButtonProps> = ({
  label,
  size = "lg",
  assign = "primary",
  onClick,
}) => {
  return (
    <button
      type="button"
      className={` 
          py-3 px-4 flex justify-center items-center 
          text-sm font-medium rounded-lg border border-transparent
          disabled:opacity-50 
          disabled:pointer-events-none
          ${Size[size]}
          ${Assign[assign]}
        `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
