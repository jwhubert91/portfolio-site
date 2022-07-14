import React, { useState } from "react"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import PageLayout from "../components/PageLayout"

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
      <CenteredContent>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col p-6 shadow rounded bg-white"
        >
          <label>
            <span>email:</span>
            <input type="email" name="email" />
          </label>
          <label>
            <span>password:</span>
            <input type="password" name="password" />
          </label>
          <Button buttonStyle="LARGE">Continue</Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default SignUp
