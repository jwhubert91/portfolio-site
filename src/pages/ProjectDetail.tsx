import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import {
  query,
  where,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore"
import { db } from "../firebase/config"
import PageLayout from "../components/PageLayout"
import { ExternalLinkType, ProjectType } from "../utilities/types"
import PillLink from "../components/PillLink"

function ProjectDetail() {
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(null)

  const { profileHandle, projectSlug } = useParams()

  // useCallback to get rid of any useEffect errors
  const memoizedLoadProject = useCallback(async () => {
    let result: DocumentData | null = null
    const projectsRef = collection(db, "projects")
    const q = query(
      projectsRef,
      where("creatorDisplayname", "==", profileHandle),
      where("urlSlug", "==", projectSlug)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      result = doc.data()
    })
    setCurrentProject(result)
  }, [profileHandle, projectSlug])

  useEffect(() => {
    memoizedLoadProject()
  }, [memoizedLoadProject])

  console.log(currentProject)

  return (
    <PageLayout className="bg-culturedBlue" isLoading={!currentProject}>
      {currentProject && (
        <div className="w-full sm:max-w-2xl mx-auto p-4 sm:px-2">
          <div>{currentProject.creatorDisplayname}</div>
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
