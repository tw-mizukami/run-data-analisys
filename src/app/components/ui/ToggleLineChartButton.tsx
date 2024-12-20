'use client';

import { useVisibleLines, VisibleLinesState } from "@/app/[lang]/data-chart/context/visibleLinesContext";
import { useI18n } from "@/app/context/i18nContext";

const ToggleLineChartButton = () => {
  const { states, setStates } = useVisibleLines();
  const { dictionary } = useI18n();
  
  const handleCheckboxChange = (key: keyof VisibleLinesState, checked: boolean) => {
    setStates(key, checked);
  };

  return (
    <div className="relative border border-blue-500 rounded-lg p-4 mt-6">
      <div className="absolute -top-3 left-4 bg-black px-2 text-white-500 font-semibold">
        {dictionary.SelectData}
      </div>
      <div className="flex flex-col space-y-4">
        {Object.keys(states).map((key) => (
          <label
            key={key}
            htmlFor={`checkbox-${key}`}
            className="flex p-3 w-36 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
          >
            <input
              id={`checkbox-${key}`}
              type="checkbox"
              checked={states[key as keyof VisibleLinesState]}
              onChange={(e) => handleCheckboxChange(key as keyof VisibleLinesState, e.target.checked)}
            />
            <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
              {dictionary[key] || key} {/* ラベルが見つからない場合はキーを表示 */}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ToggleLineChartButton;
