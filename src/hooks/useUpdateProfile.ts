import { useState } from "react"
import { updateProfile, User, UserInfo } from 'firebase/auth'

export const useUpdateProfile = ()=> {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const updateUserProfile = (user: User, newProfile: UserInfo)=> {
    setIsPending(true)
    setError(null)
    updateProfile(user, {
      ...newProfile
    }).then((res) => {
      setError(null)
      setIsPending(false)
    }).catch((err) => {
      setError(err.message)
      setIsPending(false)
    })
  }
  return { error, isPending, updateUserProfile }
}