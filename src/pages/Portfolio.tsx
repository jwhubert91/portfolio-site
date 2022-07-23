import { useEffect, useState } from "react"
import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"
import ProjectCard from "../components/ProjectCard"
import AddProjectPrompt from "../components/AddProjectPrompt"

function Portfolio() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [personalLinks, setPersonalLinks] = useState(undefined)
  const isLoggedInUser = false
  const load = async () => {
    const storedData = localStorage.getItem("profile")
    if (storedData) {
      const { title, location, bio, links } = await JSON.parse(storedData)
      setTitle(title)
      setLocation(location)
      setBio(bio)
      setPersonalLinks(links)
    }
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <PageLayout className="bg-culturedBlue">
      <div className="w-full sm:max-w-2xl mx-auto py-2 sm:px-2">
        <ProfileCard
          title={title}
          location={location}
          bio={bio}
          links={personalLinks}
          className="mb-4"
        />
        <AddProjectPrompt className="mb-2 mx-auto" />
        <h3 className="text-md">Past Work</h3>
        <ProjectCard />
      </div>
    </PageLayout>
  )
}

export default Portfolio
