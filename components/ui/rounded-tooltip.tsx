import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoundedTooltipProps {
  content?: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const RoundedTooltipDemo: React.FC<RoundedTooltipProps> = ({
  content = "This tooltip is rounded",
  children,
  side = "top",
  className = "",
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children || <Button variant="outline">Rounded</Button>}
      </TooltipTrigger>
      <TooltipContent side={side} className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide bg-neutral-900 border border-amber-500/40 text-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md ${className}`}>
        {typeof content === "string" ? <p>{content}</p> : content}
      </TooltipContent>
    </Tooltip>
  );
};

export default RoundedTooltipDemo;
export { RoundedTooltipDemo };
