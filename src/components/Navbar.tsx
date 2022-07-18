import NavAuthButtons from "./NavAuthButtons"
import NavLogo from "./NavLogo"

interface NavbarProps {
  className?: string
  isBgTransparent?: boolean
  isNavAuthShown?: boolean
}

function Navbar({
  className = "",
  isBgTransparent = false,
  isNavAuthShown = true,
}: NavbarProps) {
  const bgColorClass = isBgTransparent ? "bg-transparent" : "bg-xiketicBlack"
  return (
    <div className={`p-4 ${bgColorClass} ${className}`}>
      <nav className="flex justify-between items-center">
        <NavLogo />
        {isNavAuthShown && <NavAuthButtons />}
      </nav>
    </div>
  )
}

export default Navbar
