// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom"

// components
import CreateProfile from "./pages/CreateProfile"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/@:profileSlug" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
