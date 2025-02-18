import { NextRequest, NextResponse } from "next/server";
import { VisibleLinesState } from "../../context/visibleLinesStateContext";

let visibleLinesState : VisibleLinesState = {
  Data1: true,
  Data2: true,
  Data3: false,
  Data4: false,
  Data5: false,
  Data6: false,
  Data7: false,
  Data8: false,
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
