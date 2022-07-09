import { ReactElement } from "react"

interface PageLayoutProps {
  children?: ReactElement
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className="flex-1 w-full">{children}</div>
}

export default PageLayout
