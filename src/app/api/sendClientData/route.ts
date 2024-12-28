//
// クライアントへデータ送信
//
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // C#アプリケーションにデータを転送
    const csharpResponse = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (csharpResponse.ok) {
      return NextResponse.json({ message: "Data successfully sent to C# app" });
    } else {
      return NextResponse.json(
        { message: "Failed to send data to C# app", status: csharpResponse.status },
        { status: csharpResponse.status }
      );
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
