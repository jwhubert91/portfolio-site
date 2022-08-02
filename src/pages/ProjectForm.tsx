import React, { useEffect, useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { routes } from "../utilities/routes"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import Checkbox from "../components/Checkbox"
import FormHeader from "../components/FormHeader"
import ImageInput from "../components/ImageInput"
import Input from "../components/Input"
import LinkInputRow from "../components/LinkInputRow"
import MonthPicker from "../components/MonthPicker"
import PageLayout from "../components/PageLayout"
import TextArea from "../components/TextArea"
import { useAuthContext } from "../hooks/useAuthContext"

// firebase imports
import { db } from "../firebase/config"
import { collection, doc, addDoc, getDoc, deleteDoc } from "firebase/firestore"

function ProjectForm() {
  const [projectTitle, setProjectTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [startMonth, setStartMonth] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endMonth, setEndMonth] = useState("")
  const [endYear, setEndYear] = useState("")
  const [isInProgress, setIsInProgress] = useState(false)

  const [link1Name, setLink1Name] = useState("")
  const [link1Url, setLink1Url] = useState("")
  const [link2Name, setLink2Name] = useState("")
  const [link2Url, setLink2Url] = useState("")
  const [link3Name, setLink3Name] = useState("")
  const [link3Url, setLink3Url] = useState("")

  const navigate = useNavigate()
  const { projectId } = useParams()

  const { user } = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ref = collection(db, "projects")
    await addDoc(ref, {
      title: projectTitle,
      creatorId: user?.uid,
    })
    navigate(routes.portfolio)
  }

  const handleDelete = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    const ref = doc(db, "projects", id)
    await deleteDoc(ref)
    navigate(routes.portfolio)
  }

  const getProjectFromParams = async (id: string) => {
    const ref = doc(db, "projects", id)
    const docSnap = await getDoc(ref)
    if (docSnap.exists()) {
      const { title } = docSnap.data()
      setProjectTitle(title)
    } else {
      console.log("There was an error getting the document")
    }
  }

  useEffect(() => {
    if (!!projectId) {
      getProjectFromParams(projectId)
    }
  }, [projectId])

  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px] lg:w-full py-2 sm:py-4">
        <form
          onSubmit={handleSubmit}
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
                  Project Links 🔗
                </h4>
                <p className="text-xs italic text-black">
                  Add up to 3 links to social media, github, media mention, etc.
                </p>
              </div>
              <div className="mb-8">
                <LinkInputRow
                  onNameChange={(e) => {
                    const value = (e.target as HTMLInputElement).value
                    setLink1Name(value)
                  }}
                  onURLChange={(e) => {
                    const value = (e.target as HTMLInputElement).value
                    setLink1Url(value)
                  }}
                  linkNameInputValue={link1Name}
                  urlInputValue={link1Url}
                />
                <LinkInputRow
                  onNameChange={(e) => {
                    const value = (e.target as HTMLInputElement).value
                    setLink2Name(value)
                  }}
                  onURLChange={(e) => {
                    const value = (e.target as HTMLInputElement).value
                    setLink2Url(value)
                  }}
                  linkNameInputValue={link2Name}
                  urlInputValue={link2Url}
                />
                <LinkInputRow
                  onNameChange={(e) => {
                    const value = (e.target as HTMLInputElement).value
                    setLink3Name(value)
                  }}
                  onURLChange={(e) => {
                    const value = (e.target as HTMLInputElement).value
                    setLink3Url(value)
                  }}
                  linkNameInputValue={link3Name}
                  urlInputValue={link3Url}
                />
              </div>
            </div>
          </div>
          <Button buttonStyle="LARGE" className="mb-8 w-full lg:w-1/2 mx-auto">
            Publish
          </Button>
          {!!projectId && (
            <Button
              buttonStyle="ALERT"
              className="w-full lg:w-1/2 mx-auto text-xl"
              onClick={(e) => handleDelete(e, projectId)}
            >
              <MdDeleteForever className="text-3xl mr-2" />
              <span>Delete Project</span>
            </Button>
          )}
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default ProjectForm
