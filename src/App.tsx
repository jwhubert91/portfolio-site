// libraries
import { useEffect, useCallback } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "./firebase/config"
import { ProfileType } from "./utilities/types"

// hooks
import { useAuthContext } from "./hooks/useAuthContext"

// components
import CreateHandle from "./pages/CreateHandle"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import ProjectForm from "./pages/ProjectForm"
import FourOhFour from "./pages/FourOhFour"
import EditProfile from "./pages/EditProfile"
import ProjectDetail from "./pages/ProjectDetail"

// utils
import { getEditPortfolioRoute, routes } from "./utilities/routes"

// TODO: Put back restricted routes for createhandle, signup, login

function App() {
  const { user, authIsReady } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const memoizedValidateMinimumProfile = useCallback(async () => {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("userId", "==", user?.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const profileData: ProfileType = doc.data() as ProfileType
      if (
        (!profileData.firstName ||
          !profileData.lastName ||
          !profileData.title) &&
        !location.pathname.includes("profile")
      ) {
        navigate(getEditPortfolioRoute(profileData.displayName))
      }
    })
  }, [user, navigate, location.pathname])

  useEffect(() => {
    if (authIsReady && user && !user.displayName) {
      // there's no displayName for this user
      navigate(routes.createHandle)
    } else if (authIsReady && user) {
      memoizedValidateMinimumProfile()
    }
  }, [user, authIsReady, navigate, memoizedValidateMinimumProfile])

  return (
    <>
      <Routes>
        <Route path={routes.fourOhFour} element={<FourOhFour />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<SignUp />} />
        <Route path={routes.createHandle} element={<CreateHandle />} />
        <Route path={routes.editProfile} element={<EditProfile />} />
        <Route path={routes.portfolio}>
          <Route path={routes.portfolio} element={<Portfolio />} />
          <Route path={routes.createProject} element={<ProjectForm />} />
          <Route path={routes.editProject} element={<ProjectForm />} />
          <Route path={routes.projectDetail} element={<ProjectDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
