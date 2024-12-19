"use client"

import { Locale } from "@/i18n-config";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getDictionary } from "../[lang]/data-chart/get-dictionary";

interface I18nContextProps {
  lang: Locale; // 現在の言語
  dictionary: any; // 現在の言語の辞書データ
  setLang: (lang: Locale) => void; // 言語を変更する関数
}

const I18nContext = createContext<I18nContextProps | null>(null);

export const I18nProvider = ({
  initialLang,
  children,
}: {
  initialLang: Locale;
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Locale>(initialLang);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const result = await getDictionary(lang);
        setDictionary(result);
      } catch (error) {
        console.error("Failed to fetch dictionary:", error);
      }
    };

    fetchDictionary();
  }, [lang]);

  if (!dictionary) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  return (
    <I18nContext.Provider value={{ lang, dictionary, setLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
