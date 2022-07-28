import { useState } from "react"

// firebase imports
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"

export const useSignUp = () => {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const { dispatch } = useAuthContext()

  const signUp = (email, password) => {
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user })
        setUser(res.user)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { error, user, signUp }
}
