import { ReactElement } from "react"

interface CenteredContentProps {
  children: ReactElement
  className?: string
  innerClassName?: string
}

function CenteredContent({
  children,
  className = "",
  innerClassName = "",
}: CenteredContentProps) {
  return (
    <div className={`flex-1 flex flex-col justify-center ${className}`}>
      <main
        className={`text-center mx-auto px-4 md:max-w-4xl lg:max-w-6xl ${innerClassName}`}
      >
        {children}
      </main>
    </div>
  )
}

export default CenteredContent
