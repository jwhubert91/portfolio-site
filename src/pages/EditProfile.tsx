import React, { useState } from "react"
import PageLayout from "../components/PageLayout"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import LinkInputRow from "../components/LinkInputRow"
import Button from "../components/Button"

function EditProfile() {
  // const [profilePic, setProfilePic] = useState(null)
  // const [backgroundPic, setBackgroundPic] = useState(null)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      // profilePic,
      // backgroundPic,
      title,
      location,
      bio,
    })
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white"
        >
          <FormHeader className="mb-2" title="Edit Profile" />
          <p className="text-md mb-2 text-slate-500">
            Introduce yourself to the community
          </p>
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
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setBio(value)
            }}
            inputValue={bio}
          />
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
          <Button buttonStyle="LARGE" className="mt-4">
            Publish
          </Button>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default EditProfile
