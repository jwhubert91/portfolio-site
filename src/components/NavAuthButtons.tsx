import React from "react"
import Button from "./Button"

function NavAuthButtons() {
  const handleAuthClick = () => {
    console.log("Hey! You clicked me :)")
  }
  return (
    <div>
      <Button buttonStyle="PRIMARY_CTA" onClick={handleAuthClick}>
        Create a Portfolio
      </Button>
    </div>
  )
}

export default NavAuthButtons
