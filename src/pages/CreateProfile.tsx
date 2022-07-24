import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import { routes } from "../utilities/routes"

function CreateProfile() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUsername("")
    navigate(routes.editProfile)
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Let's get started" />
          <Input
            inputValue={username}
            label="Please choose a username"
            description="This will be how users find your portfolio"
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
