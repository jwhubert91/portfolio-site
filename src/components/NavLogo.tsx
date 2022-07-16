import { Link } from "react-router-dom"
import Logo from "./Logo"

function NavLogo() {
  return (
    <Link to="/">
      <Logo />
    </Link>
  )
}

export default NavLogo
