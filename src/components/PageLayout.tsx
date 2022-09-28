import { ReactElement, ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Footer from "./Footer"
import LoadingIndicator from "./LoadingIndicator"
import Navbar from "./Navbar"
import InvisibleH1 from "./InvisibleH1"

interface PageLayoutProps {
  children?: ReactElement | ReactNode
  className?: string
  isFooterShown?: boolean
  isNavAuthShown?: boolean
  isNavBgTransparent?: boolean
  isLoading?: boolean
  helmetTitle: string
  helmetDescription: string
  invisibleH1Title: string
}

function PageLayout({
  children,
  className = "",
  isFooterShown = true,
  isNavAuthShown = true,
  isNavBgTransparent = false,
  isLoading = false,
  helmetTitle,
  helmetDescription,
  invisibleH1Title,
}: PageLayoutProps) {
  const location = useLocation()
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>{helmetTitle}</title>
        <meta name="description" content={helmetDescription} />
        <link rel="canonical" href={location.pathname} />
      </Helmet>
      <div
        className={`flex flex-col min-h-screen overflow-x-hidden ${className}`}
      >
        <Navbar
          isBgTransparent={isNavBgTransparent}
          isNavAuthShown={isNavAuthShown}
        />
        <InvisibleH1 title={invisibleH1Title} />
        {isLoading ? <LoadingIndicator /> : children}
      </div>
      {isFooterShown && <Footer />}
    </div>
  )
}

export default PageLayout
