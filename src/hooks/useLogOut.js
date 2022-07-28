import { useState } from "react"

// firebase
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"

export const useLogOut = () => {
  const { dispatch } = useAuthContext()
  const [error, setError] = useState(null)
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
      })
      .catch((err) => {
        console.log("Error", err.message)
        setError(err.message)
      })
  }
  return { logOut, error }
}
