import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button, { getButtonStyle } from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import ErrorMessage from "../components/ErrorMessage"
import { useLogIn } from "../hooks/useLogin"
import { routes } from "../utilities/routes"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, user, error } = useLogIn()
  const navigate = useNavigate()
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }
  useEffect(() => {
    if (!error && user) {
      navigate(routes.portfolio)
    }
  }, [error, user])
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
