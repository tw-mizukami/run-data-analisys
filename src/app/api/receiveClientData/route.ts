//
// クライアントからデータを受け取り、メモリ上に保存
//
import { NextResponse } from 'next/server';

let dataStore: string;

export async function POST(request: Request) {    

  dataStore = await request.text();
  try {  
    return NextResponse.json({ message: "Data received successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to receive data from client",
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  // メモリ上のデータを返す
  return NextResponse.json(dataStore);
}
