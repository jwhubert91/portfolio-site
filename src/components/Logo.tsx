import React from "react"

interface LogoProps {
  className?: string
}

function Logo({ className = "" }: LogoProps) {
  return (
    <h1 className={`text-goldenYellow text-lg sm:text-2xl ${className}`}>
      Portful.co
    </h1>
  )
}

export default Logo
