import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "../components/PageLayout"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import LinkInputRow from "../components/LinkInputRow"
import Button from "../components/Button"
import { routes } from "../utilities/routes"
import ImageInput from "../components/ImageInput"

function EditProfile() {
  // Get back to this...
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

  const navigate = useNavigate()

  function save() {
    const currentTime = new Date().toUTCString()
    const profileJSON = JSON.stringify({
      title,
      location,
      bio,
      links: [
        { title: link1Name, url: link1Url },
        { title: link2Name, url: link2Url },
        { title: link3Name, url: link3Url },
        { title: link4Name, url: link4Url },
        { title: link5Name, url: link5Url },
      ],
      lastSaved: currentTime,
    })
    localStorage.setItem("profile", profileJSON)
  }

  const load = async () => {
    const storedData = localStorage.getItem("profile")
    if (storedData) {
      const { title, location, bio, links } = await JSON.parse(storedData)
      setTitle(title)
      setLocation(location)
      setBio(bio)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    save()
    navigate(routes.portfolio)
  }

  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px] py-2 sm:py-4">
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
            maxLength={256}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setBio(value)
            }}
            inputValue={bio}
          />
          <ImageInput
            containerClassName="py-2 mb-2"
            label="Profile picture 📸"
            description="This will be displayed above your portfolio"
          />
          <ImageInput
            containerClassName="py-2 mb-2"
            label="Background image 🌉"
            description="This will be displayed behind your profile image"
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
