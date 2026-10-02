import { NextRequest, NextResponse } from 'next/server';
import { CAR_DATABASE } from '@/data/cars';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { messages, carModel } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "dummy-key") {
      return NextResponse.json(
        { error: "Gemini API Key is not configured. Add GEMINI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    // System instruction for automotive context with embedded RAG data
    const systemInstruction = `You are an expert automotive assistant representing a high-end luxury car discovery platform. 
The user is currently viewing: ${carModel || 'the platform homepage'}.
Your tone must be highly professional, concise, authoritative, and helpful—matching the editorial format of Porsche or Apple. 
Do not use emojis unless absolutely necessary. Be precise.

CRITICAL INSTRUCTION:
Below is the EXACT, VERIFIED database of cars available. You MUST answer all user questions using ONLY the data provided below. Do not guess, and do not hallucinate external specs. If a user asks for a car not in the database, politely inform them it is currently unavailable.

--- VERIFIED CAR DATABASE ---
${JSON.stringify(CAR_DATABASE, null, 2)}
-----------------------------
`;

    // Build the contents array for Gemini REST API
    // Filter out our synthetic welcome message — only include user/model pairs starting from the first user message
    const allMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Find the first user message and slice from there
    const firstUserIdx = allMessages.findIndex((m: any) => m.role === 'user');
    const contents = firstUserIdx >= 0 ? allMessages.slice(firstUserIdx) : allMessages;

    // Call Gemini REST API directly
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: contents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini REST API Error:", JSON.stringify(data, null, 2));
      
      if (data.error?.message?.includes("API key")) {
        return NextResponse.json(
          { error: "Invalid Gemini API Key. Please check your .env.local configuration." },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: data.error?.message || "Failed to generate a response." },
        { status: 500 }
      );
    }

    // Extract the text from the response
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply }, { status: 200 });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
