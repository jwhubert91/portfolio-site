import React, { useState } from "react"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import { elementClasses } from "../utilities/constants"

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
          <label className="flex flex-col items-start mt-4">
            <span className={elementClasses.label}>email:</span>
            <input type="email" name="email" className={elementClasses.input} />
          </label>
          <label className="flex flex-col items-start mt-4">
            <span className={elementClasses.label}>password:</span>
            <input
              type="password"
              name="password"
              className={elementClasses.input}
            />
          </label>
          <label>
            <Input
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value
                console.log(value)
              }}
            />
          </label>
          <Button buttonStyle="LARGE" className="mt-4">
            Continue
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default SignUp
