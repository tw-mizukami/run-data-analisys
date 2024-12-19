import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "ja" },
  ];
}

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = await params;

    redirect(`/${lang}/data-chart`);
}
