import React from 'react';
import { Locale } from '@/i18n-config';
import { I18nProvider } from '@/app/context/i18nContext';
import LanguageSwitchButton from '@/app/[lang]/data-chart/components/ui/LanguageSwitchButton';
import DataGraph from './components/ui/DataGrpah';

interface Props {
  params: Promise<{ lang: Locale }>;
}

const DataChartPage = async ({ params }: Props) => {
  const { lang } = await params;

  return (
    <>
      <I18nProvider initialLang={lang as Locale}>
        <div className="relative mt-4 h-screen w-full">
          <div className="fixed top-5 right-10">
            <LanguageSwitchButton />
          </div>
          <div>
            <DataGraph params={params} />
          </div>
        </div>
      </I18nProvider>
    </>
  );
};

export default DataChartPage;