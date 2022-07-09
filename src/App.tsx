// libraries
import { BrowserRouter, Routes, Route } from "react-router-dom"

// components
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import AppInner from "./components/AppInner"

function App() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col App">
      <BrowserRouter>
        <AppInner>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:profileId" element={<Profile />} />
          </Routes>
        </AppInner>
      </BrowserRouter>
    </div>
  )
}

export default App
