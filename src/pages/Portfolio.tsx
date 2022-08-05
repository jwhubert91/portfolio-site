import { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuthContext } from "../hooks/useAuthContext"
import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"
import ProjectList from "../components/ProjectList"
import AddProjectPrompt from "../components/AddProjectPrompt"
import { useCollection } from "../hooks/useCollection"
import { ExternalLinkType, ProfileType } from "../utilities/types"

function Portfolio() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [personalLinks, setPersonalLinks] = useState<ExternalLinkType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [profilePicUrl, setProfilePicUrl] = useState("")
  const [backgroundPicUrl, setBackgroundPicUrl] = useState("")

  const { documents: projects } = useCollection("projects")
  const { user, authIsReady } = useAuthContext()

  const loadProfile = async () => {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("userId", "==", user?.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const profileData: ProfileType = doc.data() as ProfileType
      console.log(profileData)
      const {
        title,
        location,
        bio,
        profileImageUrl,
        backgroundImageUrl,
        profileLink1,
        profileLink2,
        profileLink3,
        profileLink4,
        profileLink5,
      } = profileData
      setTitle(title)
      setLocation(location || "")
      setBio(bio || "")
      // const links: ExternalLinkType[] = [
      //   profileLink1,
      //   profileLink2,
      //   profileLink3,
      //   profileLink4,
      //   profileLink5,
      // ]
      // setPersonalLinks(links)
      setProfilePicUrl(profileImageUrl || "")
      setBackgroundPicUrl(backgroundImageUrl || "")
    })
  }

  useEffect(() => {
    setIsLoading(true)
    if (authIsReady && user) {
      loadProfile()
    }
    setIsLoading(false)
  }, [authIsReady, user])

  return (
    <PageLayout className="bg-culturedBlue" isLoading={isLoading}>
      <div className="w-full sm:max-w-2xl mx-auto py-2 sm:px-2">
        <ProfileCard
          title={title}
          location={location}
          bio={bio}
          links={personalLinks}
          className="mb-4"
          profileImageSrc={profilePicUrl}
          backgroundImageSrc={backgroundPicUrl}
        />
        <AddProjectPrompt className="mb-2 mx-auto" />
        <h3 className="text-md mb-4">Past Work</h3>
        {projects && <ProjectList projects={projects} />}
        {/* <ProjectCard /> */}
      </div>
    </PageLayout>
  )
}

export default Portfolio
