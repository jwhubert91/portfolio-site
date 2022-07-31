import { useState } from "react"

// firebase imports
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"

export const useSignUp = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState<boolean>(false)
  const { dispatch } = useAuthContext()

  const signUp = (email: string, password: string) => {
    setIsPending(true)
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user })
        setError(null)
        setIsPending(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsPending(false)
      })
  }

  return { error, signUp, isPending }
}
