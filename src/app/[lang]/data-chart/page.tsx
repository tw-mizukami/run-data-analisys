// 言語切替用でこっちを使いたいが、リダイレクトすると404エラーが出る。

import { getDictionary } from '../dictionaries/dictionaries'

export default async function DataChartPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as 'en' | 'ja');

  return (
    <div>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
    </div>
  );
}