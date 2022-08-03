import React from "react"
import "./LoadingIndicator.css"

interface LoadingIndicatorProps {
  className?: string
}

function LoadingIndicator({ className = "" }: LoadingIndicatorProps) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="loading-spinner"></div>
    </div>
  )
}

export default LoadingIndicator
