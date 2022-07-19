import Logo from "./Logo"
import { Link } from "react-router-dom"
import { routes } from "../utilities/routes"

function Footer() {
  return (
    <footer className="h-24 bg-xiketicBlack py-4 px-8 flex justify-center items-end">
      <Link to={routes.home}>
        <Logo className="text-base sm:text-base" />
      </Link>
    </footer>
  )
}

export default Footer
