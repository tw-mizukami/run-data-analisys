import { NextRequest, NextResponse } from "next/server";
import { YAxisScale } from "../../context/yAxisScaleContext";

let yAxisScale : YAxisScale = {
    Data1: { min: 0, max: 10000, sliderMin: 0, sliderMax: 20000, sliderStep: 1000 },
    Data2: { min: 0, max: 1.0, sliderMin: 0, sliderMax: 10, sliderStep: 0.1 },
    Data3: { min: 0, max: 1.0, sliderMin: 0, sliderMax: 10, sliderStep: 0.1 },
    Data4: { min: 0, max: 1.0, sliderMin: 0, sliderMax: 10, sliderStep: 0.1 },
    Data5: { min: 0, max: 1.0, sliderMin: 0, sliderMax: 10, sliderStep: 0.1 },
    Data6: { min: 0, max: 1.0, sliderMin: 0, sliderMax: 10, sliderStep: 0.1 },
    Data7: { min: 0, max: 1.0, sliderMin: 0, sliderMax: 10, sliderStep: 0.1 },
};

// GET メソッド
export async function GET(req: NextRequest, context: { params: { lang: string } }) {
    const params = await context.params;
    console.log("Returning yAxisScale:", yAxisScale);
    return NextResponse.json(yAxisScale);
}

// POST メソッド
export async function POST(req: NextRequest, context: { params: { lang: string } }) {
    const params = await context.params;
    const body = await req.json();
    console.log("POST body received:", body); // ログを追加
    yAxisScale = { ...yAxisScale, ...body };
    console.log("Updated yAxisScale:", yAxisScale);
    return NextResponse.json(yAxisScale);
}