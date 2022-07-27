import { useState } from "react";

// firebase imports
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useLogIn = ()=> {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const login = (email: string, password: string)=> {
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log('User logged in', res.user)
        // @ts-ignore
        setUser(res.user)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return {error, user, login}
}