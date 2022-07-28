import { useEffect, createContext, useReducer, ReactNode } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../firebase/config"

interface AuthStateProps {
  user: User | null
  authIsReady: boolean
}

interface AuthActionProps {
  type: "LOGIN" | "LOGOUT" | "AUTH_IS_READY" | null
  payload: User | null
}

interface AuthContextChildrenProps {
  children: ReactNode | null
}

// Read more on context default value typing: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
interface AuthValueProps {
  user: User | null
  authIsReady: boolean
  dispatch: React.Dispatch<AuthActionProps>
}

export const AuthContext = createContext<AuthValueProps | null>(null)

export const authReducer = (state: AuthStateProps, action: AuthActionProps) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: AuthContextChildrenProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user })
      unsub()
    })
  }, [])

  console.log("AuthContext state: ", state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
