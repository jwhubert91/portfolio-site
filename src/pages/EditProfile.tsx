import React, { useState } from "react"
import PageLayout from "../components/PageLayout"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import TextArea from "../components/TextArea"

function EditProfile() {
  const [profilePic, setProfilePic] = useState(null)
  const [backgroundPic, setBackgroundPic] = useState(null)
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [profileLinks, setProfileLinks] = useState([])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      profilePic,
      backgroundPic,
      title,
      location,
      bio,
      profileLinks,
    })
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Edit Profile" />
          <p className="text-md italic">Introduce yourself to the community!</p>
          <Input
            containerClassName="mb-2"
            inputValue={title}
            label="title 💼"
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
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setLocation(value)
            }}
            type="text"
          />
          <TextArea
            label="A short bio 👀"
            description="256 characters to tell your fellow humans who you are"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setBio(value)
            }}
            inputValue={bio}
          />
          <div className="flex mb-2">
            <Input
              inputValue={location}
              containerClassName="p-0"
              inputClassName="text-sm"
              label="link 1 name"
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value
                // setLocation(value)
              }}
              type="text"
            />
            <Input
              inputValue={location}
              containerClassName="p-0"
              inputClassName="text-sm"
              label="link 1 url"
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value
                // setLocation(value)
              }}
              type="text"
            />
          </div>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default EditProfile
