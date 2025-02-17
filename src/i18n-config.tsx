export const i18n = {
    defaultLocale: "ja",
    locales: ["ja", "en"]
};

export type Locale = (typeof i18n)["locales"][number];
