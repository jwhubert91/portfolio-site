import { Link } from 'react-router-dom'

function NavLogo() {
  return (
    <Link to="/">
      <h1 className='Logo text-goldenYellow text-lg sm:text-3xl'>Portful.co</h1>
    </Link>
  )
}

export default NavLogo