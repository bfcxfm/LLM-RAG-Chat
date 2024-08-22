"use client";
import { EventsSkeleton } from "./events-skeleton";
import dynamic from "next/dynamic";
export { spinner } from "./spinner";
export { BotCard, BotMessage, SystemMessage } from "./message";

const Events = dynamic(() => import("./events").then((mod) => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />,
});

export { Events };
