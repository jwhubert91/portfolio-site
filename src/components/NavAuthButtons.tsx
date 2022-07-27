import { Link } from "react-router-dom"
import { getButtonStyle } from "./Button"
import { useLogOut } from "../hooks/useLogOut"
import { useNavigate } from "react-router-dom"
import { routes } from "../utilities/routes"
import { useState } from "react"

function NavAuthButtons() {
  // Remove once redux is in place
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const { logOut, error } = useLogOut()
  const navigate = useNavigate()

  const handleLogOut = () => {
    logOut()
    if (!error) {
      setIsLoggedIn(false)
      navigate(routes.home)
    }
  }

  return (
    <div className="overflow-visible">
      {isLoggedIn ? (
        <>
          <Link to="/@:profileSlug" className="text-snowWhite ml-2 sm:ml-4">
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
    </div>
  )
}

export default NavAuthButtons
