import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase imports
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogIn = () => {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const { dispatch } = useAuthContext()

  const login = (email, password) => {
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // @ts-ignore
        setUser(res.user)
        dispatch({ type: "LOGIN", payload: res.user })
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { error, user, login }
}
