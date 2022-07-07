import React from 'react'
import Button from './Button'

function NavAuthButtons() {
  const handleAuthClick = ()=> {
    console.log("Hey! You clicked me :)")
  }
  return (
    <div>
      <Button innerText="Create a Portfolio" buttonStyle="PRIMARY_CTA" onClick={handleAuthClick} />
    </div>
  )
}

export default NavAuthButtons