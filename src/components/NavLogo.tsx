import React from 'react'
import { Link } from 'react-router-dom'

function NavLogo() {
  return (
    <Link to="/">
      <h1 className='text-white'>Portfolio</h1>
    </Link>
  )
}

export default NavLogo