import React from "react"
import { Link } from "react-router-dom"
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
      <Link to="/login" className="text-snowWhite ml-4">
        Login
      </Link>
    </div>
  )
}

export default NavAuthButtons
