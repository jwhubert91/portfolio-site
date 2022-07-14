import { ReactElement } from "react"

interface CenteredContentProps {
  children: ReactElement
}

function CenteredContent({ children }: CenteredContentProps) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <main className="text-center mx-auto px-4 md:max-w-4xl lg:max-w-6xl">
        {children}
      </main>
    </div>
  )
}

export default CenteredContent
