import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    console.log("[API /api/ai/grok] Received prompt:", prompt);
    // Giả lập phản hồi
    const response = { message: `Received prompt: ${prompt}` };
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("[API /api/ai/grok] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}