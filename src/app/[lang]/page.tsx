export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "ja" },
  ];
}

export default function Page({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <main>
      <h1>{lang === "ja" ? "日本語ページ" : "English Page"}</h1>
    </main>
  );
}
