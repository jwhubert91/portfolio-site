import React from "react"

interface LogoProps {
  className?: string
  sizeClasses?: string
}

function Logo({
  className = "",
  sizeClasses = "text-lg sm:text-2xl",
}: LogoProps) {
  return (
    <span className={`text-goldenYellow ${className} ${sizeClasses}`}>
      Portful.co
    </span>
  )
}

export default Logo
