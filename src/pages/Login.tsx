import React, { useEffect, useState } from "react"
import { User } from "firebase/auth"
import { getPortfolioRoute } from "../utilities/routes"
import { Link, useNavigate } from "react-router-dom"
import Button, { getButtonStyle } from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import ErrorMessage from "../components/ErrorMessage"
import { useLogIn } from "../hooks/useLogin"
import { useAuthContext } from "../hooks/useAuthContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { login, error } = useLogIn()
  const { user, authIsReady } = useAuthContext()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  useEffect(() => {
    if (user && authIsReady) {
      setCurrentUser(user)
    }
    if (!!currentUser) {
      currentUser && navigate(getPortfolioRoute(currentUser?.displayName || ""))
    }
  }, [user, authIsReady, currentUser, navigate])

  return (
    <PageLayout className="flex flex-col" isNavAuthShown={false}>
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Log In" />
          {!!error && <ErrorMessage error={error} />}
          <Input
            containerClassName="mb-2"
            inputValue={email}
            label="email"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setEmail(value)
            }}
            type="email"
          />
          <Input
            inputValue={password}
            label="password"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setPassword(value)
            }}
            type="password"
          />
          <Button buttonStyle="LARGE" className="mt-4">
            Continue
          </Button>
        </form>
        <p className="mb-2">
          <Button buttonStyle="CLEAN" className="text-sm">
            Forgot your password?
          </Button>
        </p>
        <p className="text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/signup" className={getButtonStyle("CLEAN")}>
            Sign up instead
          </Link>
        </p>
      </CenteredContent>
    </PageLayout>
  )
}

export default Login
