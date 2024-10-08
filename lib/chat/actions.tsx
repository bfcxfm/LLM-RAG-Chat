import "server-only";

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";

import { spinner, BotCard, BotMessage, SystemMessage } from "@/components/aki";

import { z } from "zod";
import { EventsSkeleton } from "@/components/aki/events-skeleton";
import { Events } from "@/components/aki/events";

import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid,
} from "@/lib/utils";
import { saveChat } from "@/app/actions";
import { SpinnerMessage, UserMessage } from "@/components/aki/message";
import { Chat, Message } from "@/lib/types";
import { auth } from "@/auth";
import { Aoboshi_One } from "next/font/google";
// import { vectorStore } from "../openai";

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  console.log("apiurl", apiUrl);
  console.log("query", JSON.stringify({ query: content }));

  // Call the API route for vector search
  const response = await fetch(`${apiUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: content }),
  });

  if (!response.ok) {
    console.error("Error fetching relevant docs:", await response.text());
    return {
      id: nanoid(),
      display: (
        <BotMessage content="Sorry, I encountered an error while processing your request." />
      ),
    };
  }

  const { relevantDocs } = await response.json();
  console.log("Relevant docs:", relevantDocs);

  // Prepare the context from relevant documents
  const context = relevantDocs.map((doc: any) => doc.pageContent).join("\n\n");

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    initial: <SpinnerMessage />,
    system: `
    You are an advanced architecture assistant designed to help professionals and students navigate complex architectural concepts, projects, and data. 
    You have access to an extensive database of architectural designs, authority regulations, building codes, material specifications, historical architectural data, and contemporary practices. 
    You are also equipped to perform calculations(math formula without latex).
    When responding to queries, retrieve relevant information from context, perform necessary calculations, and generate detailed, accurate answers. 
    Ensure that your responses are contextually relevant, incorporating specific architectural principles, terminologies, and standards where necessary. 
    You may be asked to explain design processes, compare materials, interpret building regulations, suggest architectural layout, or calculate project-specific data. 
    For every query, provide a well-structured and concise response, including detailed calculation steps where applicable and references to the data sources you used.`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
      {
        role: "system",
        content: `Context: ${context}`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {},
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    const session = await auth();

    if (session && session.user) {
      const aiState = getAIState() as Chat;

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
  },
  onSetAIState: async ({ state }) => {
    "use server";

    const session = await auth();

    if (session && session.user) {
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = session.user.id as string;
      const path = `/chat/${chatId}`;

      const firstMessageContent = messages[0].content as string;
      const title = firstMessageContent.substring(0, 100);

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };

      await saveChat(chat);
    } else {
      return;
    }
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage content={message.content} />
        ) : null,
    }));
};
