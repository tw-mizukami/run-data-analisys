import { redirect } from "next/navigation";

export default function Home() {
  const defaultLocale = "en"; // デフォルトの言語を指定
  //redirect(`/${defaultLocale}`);
  redirect(`/data-chart`);
}