import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import "./index.css"

// How to add tailwind: https://tailwindcss.com/docs/guides/create-react-app

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
