import NavAuthButtons from './NavAuthButtons'
import NavLogo from './NavLogo'

function Navbar() {
  return (
    <div className='p-4 bg-xiketicBlack'>
      <nav className='flex justify-between items-center'>
        <NavLogo />
        <NavAuthButtons />
      </nav>
    </div>
  )
}

export default Navbar