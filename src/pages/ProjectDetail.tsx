import { useEffect, useState, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"
import PageLayout from "../components/PageLayout"
import ProfileImage from "../components/ProfileImage"
import { ExternalLinkType, ProfileType, ProjectType } from "../utilities/types"
import { getDateString } from "../utilities/helpers"
import PillLink from "../components/PillLink"
import { useGetSingleProject } from "../hooks/useGetSingleProject"
import { getPortfolioRoute } from "../utilities/routes"
import ProfileLink from "../components/ProfileLink"

function ProjectDetail() {
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(null)
  const [creatorProfile, setCreatorProfile] = useState<ProfileType | null>(null)
  const [projectDateString, setProjectDateString] = useState<string>("")

  const { profileHandle, projectSlug } = useParams()
  const { getProject } = useGetSingleProject()

  // useCallback to get rid of any useEffect errors
  const memoizedLoadProject = useCallback(async () => {
    if (profileHandle && projectSlug) {
      const project = (await getProject(
        profileHandle,
        projectSlug
      )) as unknown as ProjectType
      setCurrentProject(project)
      if (!!project) {
        const {
          startMonth,
          startYear,
          endMonth,
          endYear,
          inProgress,
          creatorId,
        } = project
        // 1 - set date string
        const dateString = getDateString(
          startMonth,
          startYear,
          endMonth,
          endYear,
          inProgress
        )
        setProjectDateString(dateString)
        // 2 - get creator's profile
        const citiesRef = collection(db, "users")
        const q = query(citiesRef, where("userId", "==", creatorId))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          const profile = doc.data() as ProfileType
          setCreatorProfile(profile)
        })
      }
    }
  }, [profileHandle, projectSlug, getProject])

  useEffect(() => {
    memoizedLoadProject()
  }, [memoizedLoadProject])

  return (
    <PageLayout className="bg-culturedBlue" isLoading={!currentProject}>
      {currentProject && (
        <div className="w-full sm:max-w-2xl mx-auto p-4 sm:px-2">
          {creatorProfile && (
            <ProfileLink
              displayName={creatorProfile.displayName}
              profileImageUrl={creatorProfile.profileImageUrl}
            />
          )}
          <h2 className="text-4xl my-2">{currentProject.title}</h2>
          {projectDateString && (
            <p className="text-base">{projectDateString}</p>
          )}
          <p className="text-black text-sm mb-2">{currentProject.summary256}</p>
          {!!currentProject.images && currentProject.images?.length > 0 && (
            <div className="flex justify-center w-full max-h-[500px] my-6">
              <div className="w-full max-w-[500px]">
                <img
                  src={currentProject.images[0].url}
                  alt={currentProject.title}
                  className="cover mb-2"
                />
              </div>
            </div>
          )}
          <p className="mb-4">{currentProject.description}</p>
          {currentProject.links && (
            <div className="text-xs flex flex-wrap justify-center my-1">
              {currentProject.links.map(
                (link: ExternalLinkType, idx: number) => {
                  if (!!link.title && !!link.url) {
                    return (
                      <PillLink url={link.url} label={link.title} key={idx} />
                    )
                  }
                  return null
                }
              )}
            </div>
          )}
        </div>
      )}
    </PageLayout>
  )
}

export default ProjectDetail
