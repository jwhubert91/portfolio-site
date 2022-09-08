interface ErrorMessageProps {
  className?: string
  error: string
}

function ErrorMessage({ className = "", error }: ErrorMessageProps) {
  return (
    <div className={className}>
      <p className="text-red-600">{error}</p>
    </div>
  )
}

export default ErrorMessage
