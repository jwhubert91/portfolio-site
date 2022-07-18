import { ReactElement, ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

interface PageLayoutProps {
  children?: ReactElement | ReactNode
  className?: string
  isFooterShown?: boolean
  isNavAuthShown?: boolean
  isNavBgTransparent?: boolean
}

function PageLayout({
  children,
  className = "",
  isFooterShown = true,
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
      {isFooterShown && <Footer />}
    </div>
  )
}

export default PageLayout
