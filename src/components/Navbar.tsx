import NavAuthButtons from "./NavAuthButtons"
import NavLogo from "./NavLogo"

interface NavbarProps {
  bgTransparent?: boolean
}

function Navbar({ bgTransparent = false }: NavbarProps) {
  const backgroundClasses = bgTransparent ? "bg-transparent" : "bg-xiketicBlack"
  return (
    <div className={`p-4 ${backgroundClasses}`}>
      <nav className="flex justify-between items-center">
        <NavLogo />
        <NavAuthButtons />
      </nav>
    </div>
  )
}

export default Navbar
