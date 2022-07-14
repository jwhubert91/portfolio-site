import React, { useState } from "react"
import { Link } from "react-router-dom"
import Button, { getButtonStyle } from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`You signed up with ${email}.`)
    setEmail("")
    setPassword("")
  }
  return (
    <PageLayout className="flex flex-col bg-mutedGray" isNavAuthShown={false}>
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Log In" />
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
        <p className="text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/login" className={getButtonStyle("CLEAN")}>
            Sign up instead
          </Link>
        </p>
      </CenteredContent>
    </PageLayout>
  )
}

export default Login
