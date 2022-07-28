// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom"

// components
import CreateProfile from "./pages/CreateProfile"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import ProjectForm from "./components/ProjectForm"
import FourOhFour from "./pages/FourOhFour"
import EditProfile from "./pages/EditProfile"
import ProjectDetail from "./pages/ProjectDetail"

// hooks
import { useAuthContext } from "./hooks/useAuthContext"

// utils
import { routes } from "./utilities/routes"

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<FourOhFour />} />
            <Route path={routes.home} element={<Home />} />
            <Route
              path={routes.login}
              element={user ? <Portfolio /> : <Login />}
            />
            <Route
              path={routes.signup}
              element={user ? <Portfolio /> : <SignUp />}
            />
            <Route
              path={routes.createProfile}
              element={user ? <Portfolio /> : <CreateProfile />}
            />
            <Route
              path={routes.editProfile}
              element={user ? <EditProfile /> : <Login />}
            />
            <Route path={routes.portfolio} element={<Portfolio />} />
            <Route path={routes.projects}>
              <Route
                path={routes.createProject}
                element={user ? <ProjectForm /> : <Login />}
              />
              <Route
                path={routes.editProject}
                element={user ? <ProjectForm /> : <Login />}
              />
              <Route path={routes.projectId} element={<ProjectDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
