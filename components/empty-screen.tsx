import { UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { IconArrowRight } from "@/components/ui/icons";

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent">
          Welcome to Your Architecture Assistant Bot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This open source
          <span className="font-semibold "> AKI&nbsp;</span>
          chatbot app is crafted exclusively for architecture.
        </p>
        <p className="leading-normal text-muted-foreground">
          It provides context-specific guidance using advanced Retrieval-Augmented Generation (RAG) technology, drawing on a vast database of pre-trained architectural knowledge to offer tailored insights.
        </p>
        <p className="leading-normal text-muted-foreground hidden md:block">
          For administrative users, the platform also allows for the upload of
          training data and custom code, ensuring that the assistant remains
          current and capable of providing the most informed and insightful
          responses to user inquiries.
        </p>
      </div>
    </div>
  );
}
