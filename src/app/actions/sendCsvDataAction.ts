"use server";

import { NextRequest, NextResponse } from 'next/server';

export const sendCsvDataAction = async (data: any) => {
  try {
    // C#アプリケーションにデータを転送
    const csharpResponse = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // 引数として受け取ったデータを送信
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
    const errorMessage = (error as Error).message || "Unknown error occurred";
    return NextResponse.json(
      { message: "An error occurred while sending data", error: errorMessage },
      { status: 500 }
    );
  }
};
