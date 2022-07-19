import { Link } from "react-router-dom"
import CenteredContent from "../components/CenteredContent"
import PageLayout from "../components/PageLayout"
import { routes } from "../utilities/routes"
import { getButtonStyle } from "../components/Button"

function FourOhFour() {
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p>
          You've reached the 404 page. That means the URL you typed in didn't go
          anywhere. Click{" "}
          <Link to={routes.home} className={getButtonStyle("CLEAN")}>
            here
          </Link>{" "}
          to go home, or{" "}
          <Link to={routes.login} className={getButtonStyle("CLEAN")}>
            here
          </Link>{" "}
          to sign in.
        </p>
      </CenteredContent>
    </PageLayout>
  )
}

export default FourOhFour
