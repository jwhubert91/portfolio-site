import React, { useState } from "react"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"

// For more regarding synthetic input events: https://bobbyhadz.com/blog/typescript-property-value-not-exist-type-eventtarget

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`You signed up with ${email}.`)
    setEmail("")
    setPassword("")
  }
  return (
    <PageLayout className="flex flex-col bg-mutedGray" isNavAuthShown={false}>
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white"
        >
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Sign Up</h2>
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
      </CenteredContent>
    </PageLayout>
  )
}

export default SignUp
