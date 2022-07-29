import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../utilities/routes'
import { useAuthContext } from "./useAuthContext"

export const useRerouteSignedInUser = (newPath: string = routes.portfolio)=> {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  useEffect(()=> {
    if (!!user) {
      navigate(newPath)
    }
  },[user, navigate, newPath])
}