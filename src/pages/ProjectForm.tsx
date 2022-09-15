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
import { encodeReadableURIComponent } from "../utilities/helpers"
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
  const [projectPic1StoragePath, setProjectPic1StoragePath] = useState("")
  const [projectPic1Error, setProjectPic1Error] = useState("")
  const [previousImages, setPreviousImages] = useState<ProjectImageType[]>([])
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

  const validate = () => {
    setError("")
    if (projectTitle === undefined) {
      setError("Please enter a project title")
      return false
    }
    if (summary === undefined) {
      setError("Please enter a summary")
      return false
    }
    return true
  }

  const uploadImages = async () => {
    let projectImages: ProjectImageType[] = []
    if (user?.uid) {
      const { uid } = user
      // situation 1 - there is a new picture file so we upload it to firebase storage here...
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
            const newProjectImage: ProjectImageType = {
              url: await getDownloadURL(snapshot.ref),
              title: projectPic1.name,
              storagePath: snapshot.ref.fullPath,
              projectImageOrder: 0,
            }
            projectImages.push(newProjectImage)
          })
          .catch((err) => {
            setProjectPic1Error(err.message)
          })
      }
    }
    return projectImages
  }

  const saveProject = async (projectImages: ProjectImageType[]) => {
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
        description,
        inProgress: isProjectInProgress,
        summary256: summary,
        images: projectImages,
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
      const foundProjectWithSlug = (await getProject(
        user.displayName,
        urlSlug
      )) as unknown as ProjectType
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
    const isValidated = validate()
    if (isValidated && user?.displayName && urlSlug) {
      isProjectSlugTaken().then(async (res) => {
        if (res === true) {
          setError(
            "You've already used that project URL. Please choose a different project name."
          )
          setIsLoading(false)
          return
        } else {
          // TODO: Image save problem is below this line
          let projectImages
          if (projectPic1) {
            // situation 1 - there is a new preview image
            projectImages = await uploadImages()
            await saveProject(projectImages)
          } else if (previousImages) {
            // situation 2 - there is an existing saved image and there are no changes to the image
            await saveProject(previousImages)
          } else {
            // situation 3 - there is no new image and no existing image
            await saveProject([])
          }
          // TODO: Image save problem is above this line
          if (user?.displayName) {
            const portfolioRoute = getPortfolioRoute(user.displayName)
            navigate(portfolioRoute)
          } else {
            setIsLoading(false)
            setError("There was an error. Please try again.")
          }
        }
      })
    }
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (isExistingProject && retrievedProjectRef) {
      // delete images from storage
      setProjectPic1(null)
      setProjectPic1Error("")
      if (isExistingProject && projectPic1StoragePath) {
        setProjectPic1Url("")
        deleteFile(projectPic1StoragePath).then(async () => {
          setProjectPic1StoragePath("")
          // file deleted, now update the project document with no image url
          if (!!retrievedProjectRef) {
            await updateDoc(retrievedProjectRef, {
              images: [],
            })
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

  const memoizedGetProject = useCallback(
    async (handle: string, slug: string) => {
      return (await getProject(handle, slug)) as unknown as ProjectType
    },
    // eslint-disable-next-line
    []
  )

  const memoizedFillProject = useCallback(
    async (handle: string, slug: string) => {
      const foundProject: ProjectType | null = await memoizedGetProject(
        handle,
        slug
      )
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
        setSummary(foundProject["summary256"] ? foundProject["summary256"] : "")
        setDescription(
          foundProject["description"] ? foundProject["description"] : ""
        )
        if (typeof foundProject["images"] === "object") {
          const imagesArray: ProjectImageType[] = foundProject["images"]
          if (imagesArray.length > 0) {
            setProjectPic1Url(imagesArray[0].url)
            setProjectPic1StoragePath(imagesArray[0].storagePath)
            setPreviousImages(imagesArray)
          }
        }
        if (typeof foundProject["inProgress"] === "boolean") {
          const isInProgress = foundProject["inProgress"]
          setIsProjectInProgress(isInProgress)
        }
        setStartMonth(String(foundProject["startMonth"]))
        setStartYear(String(foundProject["startYear"]))
        setEndMonth(
          foundProject["endMonth"] ? String(foundProject["endMonth"]) : ""
        )
        setEndYear(
          foundProject["endYear"] ? String(foundProject["endYear"]) : ""
        )
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
    [projectSlug, memoizedGetProject]
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
                required
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
                required
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
                  setPreviousImages([])
                  if (projectPic1StoragePath && isExistingProject) {
                    setProjectPic1Url("")
                    deleteFile(projectPic1StoragePath).then(async () => {
                      setProjectPic1StoragePath("")
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
                    minNumberValue={1900}
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
                        minNumberValue={1900}
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
                    if (!value) {
                      const thisYear = new Date().getFullYear()
                      setEndYear(thisYear.toString())
                    } else {
                      setEndYear("")
                    }
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
