import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "font-sans inline-flex items-center justify-center duration-200 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background w-fit",
  {
    variants: {
      variant: {
        default: "bg-tuatara-950 text-white hover:bg-tuatara-950/90",
        orange: "bg-orangeDark text-white hover:bg-orangeDark/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-anakiwa-400 text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        black: "bg-tuatara-950 text-white hover:bg-black",
        white: "bg-zinc-50 text-black hover:bg-zinc-100",
        blue: "bg-anakiwa-950 text-white",
        search:
          "bg-[#F6F7F7] hover:bg-[#E9ECEF] text-gray-500 border border-gray-200 rounded-md",
      },
      size: {
        default: "h-10 py-2 px-4 text-lg",
        xs: "h-[18px] px-2 rounded-md text-xs py-[2px]",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-11 px-8 rounded-md text-lg",
      },
    },
    compoundVariants: [
      {
        variant: ["default", "orange", "black", "white", "blue", "search"],
        className:
          "dark:bg-transparent dark:border dark:border-anakiwa-400 dark:text-anakiwa-400 dark:hover:bg-anakiwa-400/20 dark:hover:text-anakiwa-400",
      },
      {
        variant: ["secondary"],
        className: "dark:bg-anakiwa-400 dark:text-black",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: LucideIcon
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, children, icon, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const Icon = icon
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && <Icon size={18} />}
        <span>{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
