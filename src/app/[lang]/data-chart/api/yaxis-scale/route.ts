import { NextRequest, NextResponse } from "next/server";

let yAxisScale = {
    Data1: { Min: 0, Max: 100 },
    Data2: { Min: 0, Max: 100 },
    Data3: { Min: 0, Max: 100 },
    Data4: { Min: 0, Max: 100 },
    Data5: { Min: 0, Max: 100 },
    Data6: { Min: 0, Max: 100 },
    Data7: { Min: 0, Max: 100 },
};

// GET メソッド
export async function GET(req: NextRequest, context: { params: { lang: string } }) {
    const params = await context.params;
    console.log("Language:", params.lang);
    return NextResponse.json(yAxisScale);
}

// POST メソッド
export async function POST(req: NextRequest, context: { params: { lang: string } }) {
    const params = await context.params;
    const body = await req.json();
    yAxisScale = { ...yAxisScale, ...body };
    console.log("Updated Scale", yAxisScale, "Language:", params.lang);
    return NextResponse.json(yAxisScale);
}