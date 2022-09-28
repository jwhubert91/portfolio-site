import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import PageInner from "../components/PageInner"
import PageLayout from "../components/PageLayout"
import { getPortfolioRoute, routes } from "../utilities/routes"
import "./Home.css"

function Home() {
  const navigate = useNavigate()
  const { user, authIsReady } = useAuthContext()
  const handleHeroCTAClick = () => {
    user?.displayName
      ? navigate(getPortfolioRoute(user.displayName))
      : navigate(routes.signup)
  }
  return (
    <PageLayout
      className="flex flex-col Homepage"
      isNavBgTransparent={true}
      helmetTitle="Portful - Home"
      helmetDescription="Portful.co - Create your online portfolio in 5 minutes"
      invisibleH1Title="Portful.co - Create your online portfolio in 5 minutes"
    >
      <PageInner isVerticallyCentered={true}>
        <>
          <h2 className="text-snowWhite font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight">
            You don't need a website.
          </h2>
          <p className="mt-6 text-xl md:text-3xl text-slate-400 text-center max-w-lg md:max-w-2xl mx-auto">
            Share your past work, highlight projects, and display your contact
            info. All for free.
          </p>
          {authIsReady && (
            <Button
              buttonStyle="LARGE"
              className="mx-auto mt-4 xl:mt-12"
              onClick={handleHeroCTAClick}
            >
              Create a Portfolio
            </Button>
          )}
        </>
      </PageInner>
    </PageLayout>
  )
}

export default Home
