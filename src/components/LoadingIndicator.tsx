import "./LoadingIndicator.css"

interface LoadingIndicatorProps {
  className?: string
}

function LoadingIndicator({ className = "" }: LoadingIndicatorProps) {
  return (
    <div
      className={`flex-1 w-full h-full flex justify-center items-center ${className}`}
    >
      <div className="loading-spinner"></div>
    </div>
  )
}

export default LoadingIndicator
