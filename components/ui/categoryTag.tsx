import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"

const categoryTagVariants = cva(
  "flex p-[6px] gap-2 rounded-[6px] inline-flex items-center",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        gray: "bg-tuatara-100 text-tuatara-950",
        blue: "bg-anakiwa-300 text-black",
        selected: "bg-transparent border  text-black border",
      },
      size: {
        default: "py-1 px-2",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CategoryTagProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryTagVariants> {
  closable?: boolean
  onClose?: () => void | Promise<any>
}

const CategoryTag = React.forwardRef<HTMLDivElement, CategoryTagProps>(
  (
    { className, variant, size, onClose, closable, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(categoryTagVariants({ variant, size, className }))}
        {...props}
      >
        <span className="font-sans text-xs font-medium leading-4">
          {children}
        </span>
        {closable && (
          <div className="cursor-pointer" onClick={onClose}>
            <Icons.close size={12} />
          </div>
        )}
      </div>
    )
  }
)
CategoryTag.displayName = "CategoryTag"

export { CategoryTag, categoryTagVariants }
