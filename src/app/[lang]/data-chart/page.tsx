import React from 'react';
import { sampleRunData } from '@/app/consts/sampleRunData';
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
        <div className="grid grid-rows-[1fr_auto] h-screen">
          <div>
            <GraphRunData params={params} data={sampleRunData} />
          </div>
          <div className="fixed top-4 right-4">
            <LanguageSwitchButton />
          </div>
        </div>
        
      </I18nProvider>
    </>
  );
};

export default DataChartPage;
