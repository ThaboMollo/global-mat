import * as React from "react";
import { Textarea as MTTextarea, type TextareaProps as MTTextareaProps } from "@material-tailwind/react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends Omit<MTTextareaProps, "className"> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <MTTextarea inputRef={ref} className={cn("w-full", className)} {...props} />;
});
Textarea.displayName = "Textarea";

export { Textarea };
