"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@/components/ui/icons";
import { FolderUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function UploadToggle() {
  const { setTheme, theme } = useTheme();
  const [_, startTransition] = React.useTransition();

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <FolderUp />

            <span className="sr-only">Upload Docs</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Upload Docs</TooltipContent>
      </Tooltip>
    </>
  );
}
