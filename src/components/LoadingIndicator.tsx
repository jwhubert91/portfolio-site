import React from "react"

interface LoadingIndicatorProps {
  className?: string
}

function LoadingIndicator({ className = "" }: LoadingIndicatorProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-2xl">Loading...</p>
    </div>
  )
}

export default LoadingIndicator
