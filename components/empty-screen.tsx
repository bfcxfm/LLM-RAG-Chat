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
          It delivers precise and context-specific guidance through advanced
          Retrieval-Augmented Generation (RAG) technology. By tapping into an
          extensive database of pre-trained architectural knowledge, it offers
          invaluable insights tailored to your specific needs.
        </p>
        <p className="leading-normal text-muted-foreground">
          For administrative users, the platform also allows for the upload of
          training data and custom code, ensuring that the assistant remains
          current and capable of providing the most informed and insightful
          responses to user inquiries.
        </p>
      </div>
    </div>
  );
}
