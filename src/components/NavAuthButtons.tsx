import { Link } from "react-router-dom"
import { getButtonStyle } from "./Button"

function NavAuthButtons() {
  return (
    <div className="overflow-visible">
      <Link className={getButtonStyle("PRIMARY_CTA")} to="/signup">
        Create a Portfolio
      </Link>
      <Link to="/login" className="text-snowWhite ml-4">
        Login
      </Link>
    </div>
  )
}

export default NavAuthButtons