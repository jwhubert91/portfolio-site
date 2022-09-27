import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuthContext } from "../hooks/useAuthContext"
import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"
import ProjectCard from "../components/ProjectCard"
import AddProjectPrompt from "../components/AddProjectPrompt"
import { useProjectsCollection } from "../hooks/useProjectsCollection"
import { ExternalLinkType, ProfileType, ProjectType } from "../utilities/types"
import { User } from "firebase/auth"
import { routes } from "../utilities/routes"
import PageInner from "../components/PageInner"

function Portfolio() {
  const [currentProfile, setCurrentProfile] = useState<ProfileType | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isCurrentUserPortfolio, setIsCurrentUserPortfolio] =
    useState<boolean>(false)
  const [personalLinks, setPersonalLinks] = useState<ExternalLinkType[]>([])

  const navigate = useNavigate()

  const { profileHandle } = useParams()
  const { documents: projects } = useProjectsCollection(
    "projects",
    profileHandle
  )
  const { user, authIsReady } = useAuthContext()

  const memoizedLoadProfile = useCallback(async () => {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("displayName", "==", profileHandle))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      navigate(routes.fourOhFour, { replace: true })
    }
    querySnapshot.forEach((doc) => {
      const profileData: ProfileType = doc.data() as ProfileType
      setCurrentProfile(profileData)
      setIsCurrentUserPortfolio(currentUser?.displayName === profileHandle)
      const {
        profileLink1,
        profileLink2,
        profileLink3,
        profileLink4,
        profileLink5,
      } = profileData
      const links: ExternalLinkType[] = [
        profileLink1,
        profileLink2,
        profileLink3,
        profileLink4,
        profileLink5,
      ]
      setPersonalLinks(links)
    })
  }, [profileHandle, currentUser, navigate])

  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  useEffect(() => {
    if (authIsReady && profileHandle) {
      memoizedLoadProfile()
    }
  }, [authIsReady, profileHandle, memoizedLoadProfile])

  return (
    <PageLayout className="bg-culturedBlue" isLoading={!currentProfile}>
      <PageInner className="my-2">
        {currentProfile && (
          <div className="w-full sm:max-w-2xl mx-auto pt-2 pb-8 sm:px-2">
            <ProfileCard
              title={currentProfile.title}
              location={currentProfile.location}
              bio={currentProfile.bio}
              links={personalLinks}
              className="mb-4"
              profileImageSrc={currentProfile.profileImageUrl}
              backgroundImageSrc={currentProfile.backgroundImageUrl}
              isCurrentUserPortfolio={isCurrentUserPortfolio}
              fullName={`${currentProfile.firstName} ${currentProfile.lastName}`}
              handle={currentProfile.displayName}
            />
            {isCurrentUserPortfolio && (
              <AddProjectPrompt className="mb-2 mx-auto" />
            )}
            <h3 className="text-md mb-4">Past Work</h3>
            {projects.length > 0 ? (
              projects.map((project: ProjectType, idx) => (
                <ProjectCard
                  key={idx}
                  isCurrentUserProject={isCurrentUserPortfolio}
                  projectData={project}
                />
              ))
            ) : (
              <p className="text-center text-sm w-full sm:w-2/3 mx-auto italic">
                {isCurrentUserPortfolio ? (
                  <>
                    You currently don't have any projects listed. Click{" "}
                    <Link to={routes.createProject} className="underline bold">
                      here
                    </Link>{" "}
                    to create one!
                  </>
                ) : (
                  <>
                    There are currently no projects for this user. Try again
                    later or if this is your profile,{" "}
                    <Link to={routes.login} className="underline bold">
                      log in
                    </Link>{" "}
                    to add something 😊
                  </>
                )}
              </p>
            )}
          </div>
        )}
      </PageInner>
    </PageLayout>
  )
}

export default Portfolio
