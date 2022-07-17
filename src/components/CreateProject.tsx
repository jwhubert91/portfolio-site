import React, { useState } from "react"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input, { defaultInputClasses } from "../components/Input"
import PageLayout from "../components/PageLayout"
import TextArea from "./TextArea"

function CreateProject() {
  const [title, setTitle] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setTitle("")
    setLastName("")
    setUsername("")
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full mt-16 sm:w-[540px]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Create a new project" />
          <Input
            containerClassName="mb-2"
            inputClassName="p-2 sm:p-2"
            inputValue={title}
            label="project title"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setTitle(value)
            }}
            type="text"
          />
          <TextArea label="summary (256 characters)..." />
          <div className="flex mb-2">
            <Input
              containerClassName="flex-1"
              inputClassName="sm:text-sm p-2 sm:p-2"
              inputValue={lastName}
              label="last name"
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value
                setLastName(value)
              }}
              type="text"
            />
            <Input
              containerClassName="flex-1"
              inputClassName="sm:text-sm p-2 sm:p-2"
              inputValue={lastName}
              label="last name"
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value
                setLastName(value)
              }}
              type="text"
            />
          </div>
          <div className="flex mb-2">
            <Input
              containerClassName="flex-1"
              inputClassName="sm:text-sm p-2 sm:p-2"
              inputValue={lastName}
              label="last name"
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value
                setLastName(value)
              }}
              type="text"
            />
            <Input
              containerClassName="flex-1"
              inputClassName="sm:text-sm p-2 sm:p-2"
              inputValue={lastName}
              label="last name"
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value
                setLastName(value)
              }}
              type="text"
            />
          </div>
          <Button buttonStyle="LARGE" className="mt-4">
            Publish
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default CreateProject