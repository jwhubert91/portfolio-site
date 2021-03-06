import React, { useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { routes } from "../utilities/routes"
import Button from "./Button"
import CenteredContent from "./CenteredContent"
import Checkbox from "./Checkbox"
import FormHeader from "./FormHeader"
import ImageInput from "./ImageInput"
import Input from "./Input"
import LinkInputRow from "./LinkInputRow"
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
  const navigate = useNavigate()
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(routes.portfolio)
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px] lg:w-full py-2 sm:py-4">
        <form
          onSubmit={handleLogin}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Create a new project" />
          <div className="flex flex-col lg:flex-row gap-x-8">
            <div className="flex-1 flex flex-col justify-start">
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
                description="The summary is visible anywhere links to your project appear"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setSummary(value)
                }}
                maxLength={256}
                inputValue={summary}
              />
              <ImageInput label="image preview" containerClassName="mb-4" />
              <TextArea
                label="Description"
                description="Space for a longer description of the project, its motivations, process, other contributors, outcome, etc."
                maxLength={2000}
                inputClassName="h-48"
                containerClassName="mb-3"
              />
            </div>
            <div className="flex-1 flex flex-col justify-start">
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
              <div className="flex-1 flex flex-col justify-start">
                {!isInProgress && (
                  <div className="mb-2">
                    <p className="text-left font-semibold text-sm">
                      Date ended:
                    </p>
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
                )}
                <Checkbox
                  label="Is this project still in progress?"
                  onChange={(e) => {
                    const value = (e.target as HTMLInputElement).checked
                    setIsInProgress(value)
                  }}
                  isChecked={isInProgress}
                  containerClassName="mb-4"
                />
              </div>
              <div className="mb-2 text-left">
                <h4 className="block text-sm font-medium text-gray-700">
                  Project Links ????
                </h4>
                <p className="text-xs italic text-black">
                  Add up to 3 links to social media, github, media mention, etc.
                </p>
              </div>
              <div className="mb-8">
                <LinkInputRow />
                <LinkInputRow />
                <LinkInputRow />
              </div>
            </div>
          </div>
          <Button buttonStyle="LARGE" className="mb-8 w-full lg:w-1/2 mx-auto">
            Publish
          </Button>
          <Button
            buttonStyle="ALERT"
            className="w-full lg:w-1/2 mx-auto text-xl"
          >
            <MdDeleteForever className="text-3xl mr-2" />
            <span>Delete Project</span>
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default CreateProject
