import React, { useState } from "react"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"

function CreateProfile() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setFirstName("")
    setLastName("")
    setUsername("")
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Let's get started" />
          <Input
            containerClassName="mb-2"
            inputValue={firstName}
            label="first name"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setFirstName(value)
            }}
            type="text"
          />
          <Input
            containerClassName="mb-2"
            inputValue={lastName}
            label="last name"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setLastName(value)
            }}
            type="text"
          />
          <Input
            inputValue={username}
            label="Please choose a username"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setUsername(value)
            }}
            type="text"
          />
          <Button buttonStyle="LARGE" className="mt-4">
            Create Profile
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default CreateProfile
