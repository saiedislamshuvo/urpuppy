import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textVariants = cva(
  "font-lexend text-base ", // Base styles for all text
  {
    variants: {
      variant: {
        h1: "text-4xl font-bold leading-tight",
        h2: "text-3xl font-semibold leading-snug",
        h3: "text-2xl font-medium leading-relaxed",
        h4: "text-xl font-medium leading-relaxed",
        h5: "text-lg font-medium leading-relaxed",
        p: "text-base font-normal leading-6 ",
        small: "text-[0.8em] font-normal leading-6 ",
      },
      color: {
        default: "text-font",
        primary: "text-font",
        secondary: "text-font",
        muted: "text-font",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "p", // Updated default to "p"
      color: "default",
      align: "left",
    },
  }
);

type ValidTags = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "small";

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    variant?: ValidTags; // Restrict variant to valid HTML tags
  };

const Text: React.FC<TextProps> = ({ className, variant = "p", color, align, ...props }) => {
  const Tag = variant as ValidTags; // Explicitly assert the tag type

  return (
    <Tag className={cn(textVariants({ variant, color, align }), className)} {...props} />
  );
};

export default Text;

