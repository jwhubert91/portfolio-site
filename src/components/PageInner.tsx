import { ReactNode } from "react"

interface PageInnerProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  isVerticallyCentered?: boolean
}

function PageInner({
  children,
  className = "",
  innerClassName = "",
  isVerticallyCentered = false,
}: PageInnerProps) {
  return (
    <div
      className={`flex-1 flex flex-col ${
        isVerticallyCentered ? "justify-center" : ""
      } ${className}`}
    >
      <main
        className={`text-center mx-auto px-4 md:max-w-4xl lg:max-w-6xl ${innerClassName}`}
      >
        {children}
      </main>
    </div>
  )
}

export default PageInner
