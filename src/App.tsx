// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom"

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
import { routes } from "./utilities/routes"

// TODO: Put back restricted routes for createhandle, signup, login

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.fourOhFour} element={<FourOhFour />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<SignUp />} />
          <Route path={routes.createHandle} element={<CreateHandle />} />
          <Route path={routes.editProfile} element={<EditProfile />} />
          <Route path={routes.portfolio} element={<Portfolio />} />
          <Route path={routes.projects}>
            <Route path={routes.createProject} element={<ProjectForm />} />
            <Route path={routes.editProject} element={<ProjectForm />} />
            <Route path={routes.projectId} element={<ProjectDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
