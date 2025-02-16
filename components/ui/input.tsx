import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, children, ...props }, ref) => {
        return (
            <div className="flex items-center px-3 rounded-md border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {children}
                <input
                    type={type}
                    className={cn(
                        "flex h-9 bg-transparent pl-3 py-1 text-base placeholder:text-input disabled:cursor-not-allowed focus-visible:outline-none disabled:opacity-50 md:text-sm",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
