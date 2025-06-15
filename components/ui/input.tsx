import { InputHTMLAttributes, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "rounded-md bg-zinc-50",
    "text-anakiwa-950 placeholder-anakiwa-950",
    "border-[1.5px] border-tuatara-200",
    "transition-colors duration-100 animate",
    "focus:ring-0",
    "focus-visible:border-2 focus-visible:border-tuatara-950",
    "focus-visible:ring-0 focus-visible:none focus-visible:outline-none",
    "dark:bg-transparent dark:border dark:border-anakiwa-800 dark:text-anakiwa-300 dark:placeholder-anakiwa-300",
  ].join(" "),
  {
    variants: {
      size: {
        default: "text-sm py-2 px-4",
        sm: "text-xs py-2 px-4",
        lg: "text-lg py-3 px-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface InputProps
  extends VariantProps<typeof inputVariants>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "id" | "children"> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(inputVariants({ size, className }))}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
