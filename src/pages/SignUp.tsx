import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button, { getButtonStyle } from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import { routes } from "../utilities/routes"

// For more regarding synthetic input events: https://bobbyhadz.com/blog/typescript-property-value-not-exist-type-eventtarget

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      email,
      password,
    })
    setEmail("")
    setPassword("")
    navigate(routes.createProfile)
  }
  return (
    <PageLayout className="flex flex-col" isNavAuthShown={false}>
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Sign Up" />
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
          Already have an account?{" "}
          <Link to="/login" className={getButtonStyle("CLEAN")}>
            Log in instead
          </Link>
        </p>
      </CenteredContent>
    </PageLayout>
  )
}

export default SignUp
