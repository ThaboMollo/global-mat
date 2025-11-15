import * as React from "react";
import { Input as MTInput, type InputProps as MTInputProps } from "@material-tailwind/react";

import { cn } from "@/lib/utils";

export interface InputProps extends Omit<MTInputProps, "className"> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <MTInput inputRef={ref} className={cn("w-full", className)} {...props} />;
});
Input.displayName = "Input";

export { Input };
