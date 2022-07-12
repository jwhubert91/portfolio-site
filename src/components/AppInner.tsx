import { ReactElement } from "react"

interface AppInnerProps {
  children?: ReactElement
}

function AppInner({ children }: AppInnerProps) {
  return (
    <div className="w-full items-center flex-1 flex flex-col bg-snowWhite">
      {children}
    </div>
  )
}

export default AppInner
