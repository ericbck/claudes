import * as React from "react"
import logoImage from "@/assets/claude-logo.png"

const Logo = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex items-center space-x-4 ${className}`} {...props}>
    <img 
      src={logoImage} 
      alt="Claude's Reinigungsservice Logo" 
      className="h-20 w-auto object-contain"
    />
  </div>
))

Logo.displayName = "Logo"

export { Logo }