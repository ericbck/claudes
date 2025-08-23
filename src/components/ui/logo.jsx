import * as React from "react"
import logoImage from "@/assets/claude-logo.png"

const Logo = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex items-center justify-center space-x-4 ${className}`} {...props}>
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 scale-110"></div>
      <img 
        src={logoImage} 
        alt="Claude's Reinigungsservice Logo" 
        className="h-24 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
      />
    </div>
  </div>
))

Logo.displayName = "Logo"

export { Logo }