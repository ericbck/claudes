import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-3 text-sm font-medium text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2dd4bf]/20 focus-visible:ring-offset-0 focus-visible:border-[#2dd4bf] focus-visible:bg-white focus-visible:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-gray-300 hover:bg-white/80",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }