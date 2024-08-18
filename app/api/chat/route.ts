import { NextResponse } from "next/server";
import { vectorStore } from "@/utils/openai";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const retriever = vectorStore().asRetriever({
      searchType: "mmr",
      searchKwargs: { fetchK: 10, lambda: 0.25 },
    });

    // Retrieve relevant documents
    const relevantDocs = await retriever.invoke(query);

    return NextResponse.json({ relevantDocs });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error Processing" }, { status: 500 });
  }
}
