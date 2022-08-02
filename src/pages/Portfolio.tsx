import { useEffect, useState } from "react"
import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"
import ProjectList from "../components/ProjectList"
import AddProjectPrompt from "../components/AddProjectPrompt"
import { useCollection } from "../hooks/useCollection"
import LoadingIndicator from "../components/LoadingIndicator"

function Portfolio() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [personalLinks, setPersonalLinks] = useState(undefined)

  const { documents: projects } = useCollection("projects")

  const loadProfile = async () => {
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
    loadProfile()
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
        <h3 className="text-md mb-4">Past Work</h3>
        {projects ? <ProjectList projects={projects} /> : <LoadingIndicator />}
        {/* <ProjectCard /> */}
      </div>
    </PageLayout>
  )
}

export default Portfolio
