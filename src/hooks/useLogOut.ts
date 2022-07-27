import { useState } from "react"

// firebase
import { auth } from "../firebase/config"
import { signOut } from 'firebase/auth'

export const useLogOut = ()=> {
  const [error, setError] = useState(null)
  const logOut =()=> {
    signOut(auth)
      .then(()=> {
        console.log("User signed out")
      })
      .catch((err)=> {
        console.log("Error", err.message)
        setError(err.message)
      })
  }
  return { logOut, error }
}