import React, { useState } from "react"
import Button from "./Button"
import CenteredContent from "./CenteredContent"
import Checkbox from "./Checkbox"
import FormHeader from "./FormHeader"
import Input from "./Input"
import MonthPicker from "./MonthPicker"
import PageLayout from "./PageLayout"
import TextArea from "./TextArea"

function CreateProject() {
  const [title, setTitle] = useState("")
  const [lastName, setLastName] = useState("")
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setTitle("")
    setLastName("")
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px]">
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
          <div className="mb-2">
            <p className="text-left font-semibold text-sm">Date started:</p>
            <div className="flex">
              <MonthPicker label="month" />
              <Input
                containerClassName="flex-1 ml-2"
                inputClassName="sm:text-sm"
                inputValue={lastName}
                label="year"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLastName(value)
                }}
                type="number"
              />
            </div>
          </div>
          <div className="mb-2">
            <p className="text-left font-semibold text-sm">Date ended:</p>
            <div className="flex mb-2">
              <MonthPicker label="month" />
              <Input
                containerClassName="flex-1 ml-2"
                inputClassName="sm:text-sm"
                inputValue={lastName}
                label="year"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLastName(value)
                }}
                type="number"
              />
            </div>
          </div>
          <Checkbox
            label="Is this project still in progress?"
            isChecked={true}
          />
          <Button buttonStyle="LARGE" className="mt-4">
            Publish
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default CreateProject
