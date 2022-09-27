import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button, { getButtonStyle } from "../components/Button"
import PageInner from "../components/PageInner"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import { routes } from "../utilities/routes"
import { useSignUp } from "../hooks/useSignUp"
import ErrorMessage from "../components/ErrorMessage"
import { useAuthContext } from "../hooks/useAuthContext"

// For more regarding synthetic input events: https://bobbyhadz.com/blog/typescript-property-value-not-exist-type-eventtarget

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user } = useAuthContext()

  const navigate = useNavigate()
  const { signUp, error, isPending } = useSignUp()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    signUp(email, password)
  }

  useEffect(() => {
    if (!error && user) {
      navigate(routes.createHandle)
    }
  }, [error, user, navigate])

  return (
    <PageLayout className="flex flex-col" isNavAuthShown={false}>
      <PageInner
        isVerticallyCentered={true}
        innerClassName="w-full sm:w-[540px]"
      >
        <form
          onSubmit={handleSignUp}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Sign Up" />
          {!!error && <ErrorMessage error={error} />}
          <Input
            containerClassName="mb-2"
            inputValue={email}
            label="Email"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setEmail(value)
            }}
            type="email"
            required
          />
          <Input
            inputValue={password}
            label="Password"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setPassword(value)
            }}
            type="password"
            required
          />
          {isPending ? (
            <Button buttonStyle="LARGE" className="mt-4" disabled>
              Continue
            </Button>
          ) : (
            <Button buttonStyle="LARGE" className="mt-4">
              Continue
            </Button>
          )}
        </form>
        <p className="text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/accounts/login" className={getButtonStyle("CLEAN")}>
            Log in instead
          </Link>
        </p>
      </PageInner>
    </PageLayout>
  )
}

export default SignUp
