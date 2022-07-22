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
  const [projectTitle, setProjectTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [startMonth, setStartMonth] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endMonth, setEndMonth] = useState("")
  const [endYear, setEndYear] = useState("")
  const [isInProgress, setIsInProgress] = useState(false)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setProjectTitle("")
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
            inputValue={projectTitle}
            label="project title"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setProjectTitle(value)
            }}
            type="text"
          />
          <TextArea
            label="summary (256 characters)..."
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setSummary(value)
            }}
            maxLength={256}
            inputValue={summary}
          />
          <div className="mb-2">
            <p className="text-left font-semibold text-sm">Date started:</p>
            <div className="flex">
              <MonthPicker
                label="month"
                value={startMonth}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setStartMonth(value)
                }}
              />
              <Input
                containerClassName="flex-1 ml-2"
                inputClassName="sm:text-sm"
                inputValue={startYear}
                label="year"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setStartYear(value)
                }}
                type="number"
              />
            </div>
          </div>
          <div className="mb-2">
            <p className="text-left font-semibold text-sm">Date ended:</p>
            <div className="flex mb-2">
              <MonthPicker
                label="month"
                value={endMonth}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setEndMonth(value)
                }}
              />
              <Input
                containerClassName="flex-1 ml-2"
                inputClassName="sm:text-sm"
                inputValue={endYear}
                label="year"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setEndYear(value)
                }}
                type="number"
              />
            </div>
          </div>
          <Checkbox
            label="Is this project still in progress?"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).checked
              setIsInProgress(value)
            }}
            isChecked={isInProgress}
          />
          <Button buttonStyle="LARGE" className="mt-8">
            Publish
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default CreateProject
