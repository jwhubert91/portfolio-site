import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import { routes } from "../utilities/routes"
import { useAuthContext } from "../hooks/useAuthContext"
import { useUpdateProfile } from "../hooks/useUpdateProfile"
import ErrorMessage from "../components/ErrorMessage"

function CreateHandle() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { updateUserProfile, error, isPending } = useUpdateProfile()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      try {
        updateUserProfile(user, {
          ...user,
          displayName: username,
        })
        if (!error && !isPending) {
          console.log("Username set successfully")
          navigate(routes.editProfile)
        }
      } catch {
        console.error(error)
      }
    }
    // navigate(routes.editProfile)
  }
  return (
    <PageLayout className="flex flex-col" isNavAuthShown={false}>
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
            type=""
            required
          />
          {error && <ErrorMessage error={error} />}
          {isPending ? (
            <Button buttonStyle="LARGE" className="mt-4" disabled>
              Create Profile
            </Button>
          ) : (
            <Button buttonStyle="LARGE" className="mt-4">
              Create Profile
            </Button>
          )}
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default CreateHandle
