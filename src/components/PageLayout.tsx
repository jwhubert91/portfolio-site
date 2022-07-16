import { ReactElement, ReactNode } from "react"
import Footer from "./Footer"
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
    <div className={`min-h-screen overflow-x-hidden ${className}`}>
      <Navbar
        isBgTransparent={isNavBgTransparent}
        isNavAuthShown={isNavAuthShown}
      />
      {children}
      <Footer />
    </div>
  )
}

export default PageLayout
