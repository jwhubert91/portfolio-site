import { ReactElement, ReactNode } from "react"
import Navbar from "./Navbar"

interface PageLayoutProps {
  children?: ReactElement | ReactNode
  className?: string
  isNavAuthShown?: boolean
  isNavBgTransparent?: boolean
}

function PageLayout({
  children,
  className = "",
  isNavAuthShown = true,
  isNavBgTransparent = false,
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen overflow-hidden ${className}`}>
      <Navbar
        isBgTransparent={isNavBgTransparent}
        isNavAuthShown={isNavAuthShown}
      />
      {children}
    </div>
  )
}

export default PageLayout
