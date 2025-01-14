import type { Locale } from "@/i18n-config"

const dictionaries = {
    ja: () => import("./dictionaries/ja.json").then((module) => module.default),
    en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]?.() ?? dictionaries.ja();
}