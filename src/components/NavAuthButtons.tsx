import { Link } from "react-router-dom"
import { getButtonStyle } from "./Button"
import { useLogOut } from "../hooks/useLogOut"
import { useNavigate } from "react-router-dom"
import { getPortfolioRoute, routes } from "../utilities/routes"
import { useAuthContext } from "../hooks/useAuthContext"

function NavAuthButtons() {
  const { user, authIsReady } = useAuthContext()

  const { logOut, error } = useLogOut()
  const navigate = useNavigate()

  const handleLogOut = () => {
    logOut()
    if (!error) {
      navigate(routes.home)
    }
  }

  const userProfileRoute = getPortfolioRoute(user?.displayName || "")

  return (
    <div className="overflow-visible">
      {authIsReady && (
        <>
          {user ? (
            <>
              <Link
                to={userProfileRoute}
                className="text-snowWhite ml-2 sm:ml-4"
              >
                Profile
              </Link>
              <button
                onClick={handleLogOut}
                className="text-snowWhite ml-2 sm:ml-4"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className={getButtonStyle("PRIMARY_CTA")} to="/signup">
                Create a Portfolio
              </Link>
              <Link to="/login" className="text-snowWhite ml-2 sm:ml-4">
                Login
              </Link>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default NavAuthButtons
