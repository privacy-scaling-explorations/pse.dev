import { InputHTMLAttributes, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "py-2 px-4 text-anakiwa-950 transition-colors duration-100 animate border-[1.5px] rounded-md focus:ring-0 border-tuatara-200 focus-visible:border-2 focus-visible:border-tuatara-950 bg-zinc-50 focus-visible:ring-0 focus-visible:none focus-visible:outline-none placeholder-anakiwa-950",
  {
    variants: {
      size: {
        default: "text-sm",
        sm: "text-xs",
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
