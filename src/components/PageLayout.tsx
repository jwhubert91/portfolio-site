import { ReactElement, ReactNode } from "react"
import Footer from "./Footer"
import LoadingIndicator from "./LoadingIndicator"
import Navbar from "./Navbar"

interface PageLayoutProps {
  children?: ReactElement | ReactNode
  className?: string
  isFooterShown?: boolean
  isNavAuthShown?: boolean
  isNavBgTransparent?: boolean
  isLoading?: boolean
}

function PageLayout({
  children,
  className = "",
  isFooterShown = true,
  isNavAuthShown = true,
  isNavBgTransparent = false,
  isLoading = false,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col">
      <div className={`min-h-screen overflow-x-hidden ${className}`}>
        <Navbar
          isBgTransparent={isNavBgTransparent}
          isNavAuthShown={isNavAuthShown}
        />
        {isLoading ? <LoadingIndicator /> : children}
      </div>
      {isFooterShown && <Footer />}
    </div>
  )
}

export default PageLayout
