import { useState } from 'react'
import { collection, query, where, getDocs, DocumentReference } from 'firebase/firestore'
import { db } from '../firebase/config'
import { ProjectType } from '../utilities/types'

export const useGetSingleProject = () => {
    const [isPending, setIsPending] = useState(false)
    const [retrievedProjectRef, setRetrievedProjectRef] = useState<DocumentReference | null>(null)

    const getProject = async (profileHandle: string, projectSlug: string) => {
      setIsPending(true)
      let resultDocument: ProjectType | null = null
      const projectsRef = collection(db, "projects")
      const q = query(
        projectsRef,
        where("creatorDisplayname", "==", profileHandle),
        where("urlSlug", "==", projectSlug)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const result = doc.data()
        const resultRef = doc.ref
        setRetrievedProjectRef(resultRef)
        const { 
          creatorId,
          creatorDisplayname,
          description,
          title,
          urlSlug,
          summary256,
          startMonth,
          startYear,
          endMonth,
          endYear,
          inProgress,
          images,
          links,
          timestamp
        } = result
        console.log(result)
        resultDocument = {
          creatorId,
          creatorDisplayname,
          description,
          title,
          urlSlug,
          summary256,
          startMonth,
          startYear,
          endMonth,
          endYear,
          inProgress,
          images,
          links,
          timestamp,
        }
      })
      setIsPending(false)
      return resultDocument
    }
    return { isPending, getProject, retrievedProjectRef }
  }