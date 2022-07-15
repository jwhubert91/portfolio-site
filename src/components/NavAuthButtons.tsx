import { useState } from "react"
import { Link } from "react-router-dom"
import { getButtonStyle } from "./Button"

function NavAuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <div className="overflow-visible">
      {isLoggedIn ? (
        <Link to="/" className="text-snowWhite ml-2 sm:ml-4">
          Log Out
        </Link>
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
