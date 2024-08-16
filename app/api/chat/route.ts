import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter } from "ai";
import { Message } from "ai";
import { vectorStore } from "@/utils/openai";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: Message[] = body.messages ?? [];
    const latestMessage = messages[messages.length - 1].content;

    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo-0125",
      temperature: 0.8,
      streaming: true,
    });

    const retriever = vectorStore().asRetriever({
      searchType: "mmr",
      searchKwargs: { fetchK: 10, lambda: 0.25 },
    });

    // Retrieve relevant documents
    const relevantDocs = await retriever.getRelevantDocuments(latestMessage);

    // Prepare the prompt with context
    const contextPrompt = `
            Context: ${relevantDocs.map((doc) => doc.pageContent).join("\n\n")}
            
            Human: ${latestMessage}
            
            Assistant: Based on the context provided, here's my response:
        `;

    const stream = await model.stream(contextPrompt);

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error Processing" }, { status: 500 });
  }
}
