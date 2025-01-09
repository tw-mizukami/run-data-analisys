//
// クライアントからデータを受け取り、メモリ上に保存
//
import { NextResponse } from 'next/server';

let dataStore: string;

export async function POST(request: Request) {    

  try {
      const arrayBuffer = await request.arrayBuffer();
      const textDecoder = new TextDecoder("shift-jis");
      const decodedText = textDecoder.decode(arrayBuffer);
      
      try {
        const jsonBody = JSON.parse(decodedText);
        dataStore = jsonBody;
      } catch (error) {
        console.error("Failed to parse JSON (from Shift-JIS):", error);
      }
    
    } catch (error) {
      console.error("Failed to parse request text:", error);
      return NextResponse.json(
        {
          message: "Invalid request format",
          error: error instanceof Error ? error.message : "An unknown error occurred",
        },
        { status: 400 }
      );
    }

  try { 
    return NextResponse.json({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
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
  if (dataStore) {
    console.log("GET", dataStore);
    return NextResponse.json({ data: dataStore });
  } else {
    return NextResponse.json(
      { message: "データが見つかりません" },
      { status: 404 } // HTTP 404 Not Found
    );
  }
}
