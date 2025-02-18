"use client"

import { useI18n } from "@/app/context/i18nContext";
import { Locale } from "@/i18n-config";
  
function LanguageSwitchButton() {
  const { lang, setLang } = useI18n();

  const handleLanguageChange = (newLang: Locale) => {
    console.log("Switching language to:", newLang);
    setLang(newLang); // 言語を変更
  };
  
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => handleLanguageChange("ja")}
        className={`px-4 py-2 rounded ${
          lang === "ja" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        日本語
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-4 py-2 rounded ${
          lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        English
      </button>
    </div>
  );
}

export default LanguageSwitchButton;
