import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import PageLayout from "../components/PageLayout"
import { ExternalLinkType, ProfileType, ProjectType } from "../utilities/types"
import PillLink from "../components/PillLink"
import { useGetSingleProject } from "../hooks/useGetSingleProject"

function ProjectDetail() {
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(null)
  const [projectProfile, setProjectProfile] = useState<ProfileType | null>(null)

  const { profileHandle, projectSlug } = useParams()
  const { getProject } = useGetSingleProject()

  // useCallback to get rid of any useEffect errors
  const memoizedLoadProject = useCallback(async () => {
    if (profileHandle && projectSlug) {
      const project = await getProject(profileHandle, projectSlug)
      setCurrentProject(project)
    }
  }, [profileHandle, projectSlug, getProject])

  useEffect(() => {
    memoizedLoadProject()
  }, [])

  return (
    <PageLayout className="bg-culturedBlue" isLoading={!currentProject}>
      {currentProject && (
        <div className="w-full sm:max-w-2xl mx-auto p-4 sm:px-2">
          {projectProfile && <>profile info</>}
          <h2 className="font-bold text-xl">{currentProject.title}</h2>
          <p className="text-base">Date Started - Date Finished or Current</p>
          <p className="text-black text-sm mb-2">{currentProject.summary256}</p>
          {currentProject.images && (
            <img
              src={currentProject.images[0].url}
              alt={currentProject.title}
              className="cover mb-2"
            />
          )}
          <p className="mb-4">{currentProject.description}</p>
          {currentProject.links && (
            <div className="text-xs flex flex-wrap justify-center my-1">
              {currentProject.links.map(
                (link: ExternalLinkType, idx: number) => (
                  <PillLink url={link.url} label={link.title} key={idx} />
                )
              )}
            </div>
          )}
        </div>
      )}
    </PageLayout>
  )
}

export default ProjectDetail
