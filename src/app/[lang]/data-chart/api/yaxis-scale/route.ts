import { NextRequest, NextResponse } from "next/server";
import { YAxisScale } from "../../context/yAxisScaleContext";

let yAxisScale : YAxisScale = {
    Data1: { min: 0, max: 10000, isAuto: true, sliderMin: 0, sliderMax: 20000, sliderStep: 1000 },
    Data2: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data3: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data4: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data5: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data6: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data7: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
    Data8: { min: 0, max: 1.0, isAuto: true, sliderMin: 0, sliderMax: 5, sliderStep: 0.1 },
};

// GET メソッド
export async function GET(req: NextRequest, context: { params: { lang: string } }) {
    const params = await context.params;
    return NextResponse.json(yAxisScale);
}

// POST メソッド
export async function POST(req: NextRequest, context: { params: { lang: string } }) {
    const params = await context.params;
    const body = await req.json();
    yAxisScale = { ...yAxisScale, ...body };
    return NextResponse.json(yAxisScale);
}