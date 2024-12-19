import { NextRequest, NextResponse } from "next/server";

let visibleLinesState = {
  Data1: true,
  Data2: true,
  Data3: true,
  Data4: true,
  Data5: true,
  Data6: true,
  Data7: true,
};

// GET メソッド
export async function GET(req: NextRequest, context: { params: { lang: string } }) {
  const params = await context.params; // 非同期で params を取得
  console.log("Language:", params.lang); // 動的ルートの値を確認
  return NextResponse.json(visibleLinesState);
}

// POST メソッド
export async function POST(req: NextRequest, context: { params: { lang: string } }) {
  const params = await context.params; // 非同期で params を取得
  const body = await req.json();
  visibleLinesState = { ...visibleLinesState, ...body };
  console.log("Updated State:", visibleLinesState, "Language:", params.lang);
  return NextResponse.json(visibleLinesState);
}
