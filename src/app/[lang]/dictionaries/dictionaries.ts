import 'server-only';

type Locale = 'en' | 'ja';

const dictionaries: Record<Locale, () => Promise<{ home: { title: string; description: string } }>> = {
  en: () => import('./en.json').then((module) => module.default),
  ja: () => import('./ja.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    throw new Error(`Locale '${locale}' is not supported.`);
  }
  return dictionaries[locale]();
};
