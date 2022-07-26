// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom"

// components
import CreateProfile from "./pages/CreateProfile"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import CreateProject from "./components/CreateProject"
import FourOhFour from "./pages/FourOhFour"
import EditProfile from "./pages/EditProfile"

// utils
import { routes } from "./utilities/routes"
import ProjectDetail from "./pages/ProjectDetail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<FourOhFour />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<SignUp />} />
        <Route path={routes.createProfile} element={<CreateProfile />} />
        <Route path={routes.editProfile} element={<EditProfile />} />
        <Route path={routes.portfolio} element={<Portfolio />} />
        <Route path={routes.projects}>
          <Route path={routes.createProject} element={<CreateProject />} />
          <Route path={routes.editProject} element={<CreateProject />} />
          <Route path={routes.projectDetail} element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
