import React, { useEffect, useState, useCallback } from "react"
import { MdDeleteForever } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { getPortfolioRoute } from "../utilities/routes"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import Checkbox from "../components/Checkbox"
import FormHeader from "../components/FormHeader"
import ImageInput, { validateImageChange } from "../components/ImageInput"
import Input from "../components/Input"
import LinkInputRow from "../components/LinkInputRow"
import MonthPicker from "../components/MonthPicker"
import PageLayout from "../components/PageLayout"
import TextArea from "../components/TextArea"
import { useAuthContext } from "../hooks/useAuthContext"
import { useStorage } from "../hooks/useStorage"
import ErrorMessage from "../components/ErrorMessage"

// NOTE: If you get console errors when pressing enter while focused on a textarea, it's because of LastPass. You can get rid of them by disabling LastPass
// article: https://www.rockyourcode.com/assertion-failed-input-argument-is-not-an-htmlinputelement/

// firebase imports
import { db, storage } from "../firebase/config"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {
  ExternalLinkType,
  ProjectImageType,
  ProjectType,
} from "../utilities/types"
import {
  encodeReadableURIComponent,
  getFilenameFromImageURL,
} from "../utilities/helpers"
import { useGetSingleProject } from "../hooks/useGetSingleProject"

function ProjectForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [urlSlug, setUrlSlug] = useState("")
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [startMonth, setStartMonth] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endMonth, setEndMonth] = useState("")
  const [endYear, setEndYear] = useState("")
  const [isProjectInProgress, setIsProjectInProgress] = useState(false)
  const [projectPic1, setProjectPic1] = useState<File | null>(null)
  const [projectPic1Url, setProjectPic1Url] = useState<string>("")
  const [projectPic1Error, setProjectPic1Error] = useState("")
  const [error, setError] = useState("")
  const [isExistingProject, setIsExistingProject] = useState(false)

  const [link1Name, setLink1Name] = useState<string>("")
  const [link1Url, setLink1Url] = useState<string>("")
  const [link2Name, setLink2Name] = useState<string>("")
  const [link2Url, setLink2Url] = useState<string>("")
  const [link3Name, setLink3Name] = useState<string>("")
  const [link3Url, setLink3Url] = useState<string>("")

  const navigate = useNavigate()
  const { profileHandle, projectSlug } = useParams()
  const { getFilePath, deleteFile } = useStorage()
  const { user } = useAuthContext()
  const { getProject, isPending, retrievedProjectRef } = useGetSingleProject()

  const uploadImages = async () => {
    let imageUrls = {
      projectPicUrl1: "",
    }
    if (user?.uid) {
      const { uid } = user
      if (!!projectPic1) {
        const uploadPath: string = getFilePath(
          "images",
          uid,
          "projects",
          projectPic1.name
        )
        const storageRef = ref(storage, uploadPath)
        await uploadBytes(storageRef, projectPic1)
          .then(async (snapshot) => {
            imageUrls.projectPicUrl1 = await getDownloadURL(snapshot.ref)
          })
          .catch((err) => {
            setProjectPic1Error(err.message)
          })
      }
    }
    return imageUrls
  }

  const saveProject = async (imageUrls: { projectPic1DownloadUrl: string }) => {
    const projectPic1Element: ProjectImageType = {
      url: imageUrls.projectPic1DownloadUrl,
      title: projectPic1?.name ? projectPic1?.name : "",
      projectImageOrder: 0,
    }
    if (user && user.uid && user.displayName) {
      const newProject: ProjectType = {
        creatorId: user.uid,
        creatorDisplayname: user.displayName,
        title: projectTitle,
        urlSlug,
        startMonth: Number(startMonth),
        startYear: Number(startYear),
        endMonth: isProjectInProgress ? null : Number(endMonth),
        endYear: isProjectInProgress ? null : Number(endYear),
        inProgress: isProjectInProgress,
        summary256: summary,
        images: imageUrls.projectPic1DownloadUrl ? [projectPic1Element] : [],
        timestamp: serverTimestamp(),
        links: [
          {
            url: link1Url,
            title: link1Name,
          },
          {
            url: link2Url,
            title: link2Name,
          },
          {
            url: link3Url,
            title: link3Url,
          },
        ],
      }
      const ref = collection(db, "projects")
      if (isExistingProject) {
        // existing project
        if (!!retrievedProjectRef) {
          await updateDoc(retrievedProjectRef, {
            ...newProject,
          })
        }
      } else {
        // new project
        await addDoc(ref, {
          ...newProject,
        })
      }
    }
  }

  const isProjectSlugTaken = async () => {
    if (user?.displayName && urlSlug) {
      if (urlSlug === projectSlug) {
        return false
      }
      const foundProjectWithSlug = await getProject(user.displayName, urlSlug)
      if (!!foundProjectWithSlug) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (user?.displayName && urlSlug) {
      isProjectSlugTaken().then(async (res) => {
        if (res === true) {
          setError(
            "You've already used that project URL. Please choose a different project name."
          )
          setIsLoading(false)
          return
        } else {
          // TODO: If you are updating an existing document, handle that here as well...
          let { projectPicUrl1 } = await uploadImages()
          await saveProject({
            projectPic1DownloadUrl: projectPicUrl1
              ? projectPicUrl1
              : projectPic1Url,
          })
          if (user?.displayName) {
            const portfolioRoute = getPortfolioRoute(user.displayName)
            navigate(portfolioRoute)
          } else {
            setError("There was an error. Please try again.")
          }
        }
      })
    }
    setIsLoading(false)
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (isExistingProject && retrievedProjectRef) {
      // delete images from storage
      setProjectPic1(null)
      setProjectPic1Error("")
      const filename = getFilenameFromImageURL(projectPic1Url)
      if (projectPic1Url && isExistingProject) {
        const filepath = getFilePath(
          "images",
          user ? user.uid : "",
          "projects",
          filename
        )
        setProjectPic1Url("")
        deleteFile(filepath).then(async () => {
          // now save the project with no image url
          if (!!retrievedProjectRef) {
            await updateDoc(retrievedProjectRef, {
              images: [],
            }).then((res) => console.log("image deleted"))
          }
        })
      }
      // delete project from db
      await deleteDoc(retrievedProjectRef)
    }
    if (profileHandle) {
      navigate(getPortfolioRoute(profileHandle))
    }
    setIsLoading(false)
  }

  const memoizedFillProject = useCallback(
    async (handle: string, slug: string) => {
      const foundProject: ProjectType | null = await getProject(handle, slug)
      setIsLoading(true)
      if (!!foundProject) {
        if (typeof foundProject["title"] === "string") {
          const projectTitle: string = foundProject["title"]
          setProjectTitle(projectTitle)
          const urlSlugResult: string = encodeReadableURIComponent(
            projectTitle.toLowerCase()
          )
          setUrlSlug(urlSlugResult)
          if (urlSlugResult === projectSlug) {
            setIsExistingProject(true)
          }
        }
        setSummary(foundProject["summary256"])
        setDescription(foundProject["description"])
        if (typeof foundProject["images"] === "object") {
          const imagesArray: ProjectImageType[] = foundProject["images"]
          if (imagesArray.length > 0) {
            setProjectPic1Url(imagesArray[0].url)
          }
        }
        if (typeof foundProject["inProgress"] === "boolean") {
          const isInProgress = foundProject["inProgress"]
          setIsProjectInProgress(isInProgress)
        }
        setStartMonth(foundProject["startMonth"])
        setStartYear(foundProject["startYear"])
        setEndMonth(foundProject["endMonth"])
        setEndYear(foundProject["endYear"])
        if (typeof foundProject["links"] === "object") {
          const projectLinks: ExternalLinkType[] = foundProject["links"]
          const projectLink1: ExternalLinkType = projectLinks[0]
          const projectLink2: ExternalLinkType = projectLinks[1]
          const projectLink3: ExternalLinkType = projectLinks[2]
          setLink1Name(projectLink1.title)
          setLink1Url(projectLink1.url)
          setLink2Name(projectLink2.title)
          setLink2Url(projectLink2.url)
          setLink3Name(projectLink3.title)
          setLink3Url(projectLink3.url)
        }
      }
      setIsLoading(false)
    },
    [projectSlug]
  )

  useEffect(() => {
    if (!!profileHandle && !!projectSlug) {
      memoizedFillProject(profileHandle, projectSlug)
    }
  }, [profileHandle, projectSlug, memoizedFillProject])

  return (
    <PageLayout className="flex flex-col" isLoading={isLoading || isPending}>
      <CenteredContent innerClassName="w-full sm:w-[540px] lg:w-full py-4">
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
                label="project title ✍️"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setProjectTitle(value)
                  const urlSlugResult: string = encodeReadableURIComponent(
                    value.toLowerCase()
                  )
                  setUrlSlug(urlSlugResult)
                }}
                bottomNote={`Project URL: @${user?.displayName}/${urlSlug}`}
              />
              <TextArea
                label="summary (256 characters)..."
                description="The short summary is visible anywhere links to your project appear"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setSummary(value)
                }}
                maxLength={256}
                inputValue={summary}
              />
              <ImageInput
                containerClassName="py-2 mb-2"
                label="Featured image 🎨"
                description="A landscape image that demonstrates this project. Less than 2 MB"
                onChange={(e) => {
                  setProjectPic1(null)
                  setProjectPic1Error("")
                  let { imageError, validatedImage } = validateImageChange(
                    e,
                    2000000,
                    "project image 1"
                  )
                  if (imageError) {
                    setProjectPic1Error(imageError)
                  } else {
                    setProjectPic1(validatedImage)
                  }
                }}
                validation={projectPic1Error}
                previewUrl={
                  projectPic1
                    ? URL.createObjectURL(projectPic1)
                    : projectPic1Url
                }
                onDelete={(e) => {
                  e.preventDefault()
                  // TODO: delete URL references to the file on the project object in firestore
                  setIsLoading(true)
                  setProjectPic1(null)
                  setProjectPic1Error("")
                  const filename = getFilenameFromImageURL(projectPic1Url)
                  if (projectPic1Url && isExistingProject) {
                    const filepath = getFilePath(
                      "images",
                      user ? user.uid : "",
                      "projects",
                      filename
                    )
                    setProjectPic1Url("")
                    deleteFile(filepath).then(async () => {
                      // now save the project with no image url
                      if (!!retrievedProjectRef) {
                        await updateDoc(retrievedProjectRef, {
                          images: [],
                        }).then((res) => console.log("image deleted"))
                      }
                    })
                  }
                  setIsLoading(false)
                }}
                previewSizeClasses="h-40"
                isSelectShown={!projectPic1 && !projectPic1Url}
              />
              <TextArea
                label="Description 📖"
                description="Space for a longer description of the project, its motivations, process, other contributors, outcome, etc."
                maxLength={2000}
                inputClassName="h-48"
                containerClassName="mb-3"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setDescription(value)
                }}
                inputValue={description}
              />
            </div>
            <div className="flex-1 flex flex-col justify-start">
              <div className="mb-2">
                <p className="text-left font-semibold text-sm">
                  Date started: 🗓
                </p>
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
                {!isProjectInProgress && (
                  <div className="mb-2">
                    <p className="text-left font-semibold text-sm">
                      Date ended: 🏁
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
                    setIsProjectInProgress(value)
                  }}
                  isChecked={isProjectInProgress}
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
          {error && <ErrorMessage error={error} className="my-2" />}
          <Button buttonStyle="LARGE" className="mb-8 w-full lg:w-1/2 mx-auto">
            Publish
          </Button>
          {!!projectSlug && (
            <Button
              buttonStyle="ALERT"
              className="w-full lg:w-1/2 mx-auto text-xl"
              onClick={(e) => handleDelete(e)}
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
