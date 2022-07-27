import { useState } from "react";

// firebase imports
import { auth } from "../firebase/config";
import {createUserWithEmailAndPassword} from 'firebase/auth'

export const useSignUp = ()=> {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const signUp = (email: string, password: string)=> {
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log('User signed up', res.user)
        // @ts-ignore
        setUser(res.user)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return {error, user, signUp}
}