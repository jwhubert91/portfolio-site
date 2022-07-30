import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase imports
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogIn = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const login = (email: string, password: string) => {
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user })
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { error, login }
}
