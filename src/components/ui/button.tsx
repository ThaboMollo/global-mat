import * as React from "react";
import type { ButtonProps as MTButtonProps } from "@material-tailwind/react";
import { Button as MTButton } from "@material-tailwind/react";

import { cn } from "@/lib/utils";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "hero";
type Size = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends Omit<MTButtonProps, "variant" | "size" | "color" | "fullWidth" | "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  asChild?: boolean; // kept for API compatibility, not used with Material Tailwind
}

const mapVariantToMaterial = (variant: Variant = "default") => {
  switch (variant) {
    case "destructive":
      return { variant: "filled" as const, color: "red" as const };
    case "outline":
      return { variant: "outlined" as const, color: "blue" as const };
    case "secondary":
      return { variant: "filled" as const, color: "gray" as const };
    case "ghost":
      return { variant: "text" as const, color: "blue" as const };
    case "link":
      return { variant: "text" as const, color: "blue" as const };
    case "hero":
      return { variant: "gradient" as const, color: "amber" as const };
    case "default":
    default:
      return { variant: "filled" as const, color: "blue" as const };
  }
};

const mapSizeToMaterial = (size: Size = "default") => {
  switch (size) {
    case "sm":
      return { size: "sm" as const, className: "h-9 px-3" };
    case "lg":
      return { size: "lg" as const, className: "h-11 px-8" };
    case "icon":
      return { size: "md" as const, className: "h-10 w-10 p-0" };
    case "default":
    default:
      return { size: "md" as const, className: "h-10 px-4" };
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild: _asChild, ...props }, ref) => {
    const { variant: mtVariant, color } = mapVariantToMaterial(variant);
    const { size: mtSize, className: sizeClasses } = mapSizeToMaterial(size);

    return (
      <MTButton
        ref={ref as any}
        variant={mtVariant}
        color={color}
        size={mtSize}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          sizeClasses,
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
