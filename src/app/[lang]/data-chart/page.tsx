import React from 'react';
import { Locale } from '@/i18n-config';
import GraphRunData from './components/ui/GraphRunData';
import LanguageSwitchButton from '@/app/components/ui/LanguageSwitchButton';
import { I18nProvider } from '@/app/context/i18nContext';

interface Props {
  params: Promise<{ lang: Locale }>;
}

const DataChartPage = async ({ params }: Props) => {
  const { lang } = await params;

  return (
    <>
      <I18nProvider initialLang={lang as Locale}>
        <div className="relative mt-4 h-screen w-full">
          <div className="absolute top-2 right-2">
            <LanguageSwitchButton />
          </div>
          <div>
            <GraphRunData params={params} />
          </div>
        </div>
      </I18nProvider>
    </>
  );
};

export default DataChartPage;