import NavAuthButtons from './NavAuthButtons'
import NavLogo from './NavLogo'

function Navbar() {
  return (
    <div className='bg-black p-4'>
      <nav className='flex justify-between items-center'>
        <NavLogo />
        <NavAuthButtons />
      </nav>
    </div>
  )
}

export default Navbar