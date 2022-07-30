import React, { useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import PageLayout from "../components/PageLayout"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import LinkInputRow from "../components/LinkInputRow"
import Button from "../components/Button"
import { routes } from "../utilities/routes"
import ImageInput, { validateImageChange } from "../components/ImageInput"

function EditProfile() {
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [profilePicError, setProfilePicError] = useState("")
  const [backgroundPic, setBackgroundPic] = useState<File | null>(null)
  const [backgroundPicError, setBackgroundPicError] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [pronouns, setPronouns] = useState("")
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [link1Name, setLink1Name] = useState("")
  const [link1Url, setLink1Url] = useState("")
  const [link2Name, setLink2Name] = useState("")
  const [link2Url, setLink2Url] = useState("")
  const [link3Name, setLink3Name] = useState("")
  const [link3Url, setLink3Url] = useState("")
  const [link4Name, setLink4Name] = useState("")
  const [link4Url, setLink4Url] = useState("")
  const [link5Name, setLink5Name] = useState("")
  const [link5Url, setLink5Url] = useState("")

  const navigate = useNavigate()

  function save() {
    console.log("Saved!")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    save()
    navigate(routes.portfolio)
  }

  const handleDeactivate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile deactivated")
  }

  return (
    <PageLayout className="flex flex-col" isNavAuthShown={false}>
      <CenteredContent innerClassName="w-full sm:w-[540px] lg:w-full py-2 sm:py-4">
        <form className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white">
          <FormHeader className="mb-2" title="Edit Profile" />
          <p className="text-md mb-2 lg:mb-8 text-slate-500">
            Introduce yourself to the community
          </p>
          <div className="flex flex-col lg:flex-row gap-x-8 mb-4">
            <div className="flex-1 flex flex-col justify-start">
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
                containerClassName="mb-2"
                inputValue={pronouns}
                label="optional pronouns"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setPronouns(value)
                }}
                type="text"
              />
              <Input
                containerClassName="mb-2"
                inputValue={title}
                label="title 💼"
                placeholder="Architect, Designer, Web Developer"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setTitle(value)
                }}
                type="text"
              />
              <Input
                containerClassName="mb-2"
                inputValue={location}
                label="location 🌎"
                placeholder="New York, NY"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLocation(value)
                }}
                type="text"
              />
              <TextArea
                label="A short bio 👀"
                description="256 characters to tell your fellow humans who you are"
                placeholder="I am a..."
                maxLength={256}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setBio(value)
                }}
                inputValue={bio}
              />
              {/* Net Ninja videos on uploading videos are: 160 */}
              <ImageInput
                containerClassName="py-2 mb-2"
                label="Profile picture 📸"
                description="A square headshot is best. Less than 1 MB"
                onChange={(e) => {
                  setProfilePic(null)
                  setProfilePicError("")
                  let { imageError, validatedImage } = validateImageChange(
                    e,
                    1000000,
                    "profile image"
                  )
                  if (imageError) {
                    setProfilePicError(imageError)
                  } else {
                    setProfilePic(validatedImage)
                  }
                }}
                validation={profilePicError}
                preview={profilePic}
                previewClassName="h-20 w-20"
              />
              <ImageInput
                containerClassName="py-2 mb-2"
                label="Background image 🌉"
                description="A wide or landscape image works best here. Less than 1 MB."
                onChange={(e) => {
                  setBackgroundPic(null)
                  setBackgroundPicError("")
                  let { imageError, validatedImage } = validateImageChange(
                    e,
                    1000000,
                    "background image"
                  )
                  if (imageError) {
                    setBackgroundPicError(imageError)
                  } else {
                    setBackgroundPic(validatedImage)
                  }
                }}
                validation={backgroundPicError}
                preview={backgroundPic}
                previewClassName="h-20 w-40"
              />
            </div>
            <div className="flex-1 flex flex-col lg:justify-start">
              <div className="mb-2 text-left">
                <h4 className="block text-sm font-medium text-gray-700">
                  Personal Links 🔗
                </h4>
                <p className="text-xs italic text-black">
                  Add up to 5 links to social media, a website, etc.
                </p>
              </div>
              <LinkInputRow
                linkNameInputValue={link1Name}
                urlInputValue={link1Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink1Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink1Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link2Name}
                urlInputValue={link2Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink2Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink2Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link3Name}
                urlInputValue={link3Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink3Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink3Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link4Name}
                urlInputValue={link4Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink4Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink4Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link5Name}
                urlInputValue={link5Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink5Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink5Url(value)
                }}
              />
            </div>
          </div>
          <Button
            buttonStyle="LARGE"
            className="mb-8 w-full lg:w-1/2 mx-auto"
            onClick={handleSubmit}
          >
            Publish
          </Button>
          <Button
            buttonStyle="ALERT"
            className="w-full lg:w-1/2 mx-auto text-xl"
            onClick={handleDeactivate}
          >
            <MdDeleteForever className="text-3xl mr-2" />
            <span>Deactivate Profile</span>
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default EditProfile
