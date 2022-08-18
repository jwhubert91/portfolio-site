import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { ProjectType } from '../utilities/types'

/*
export interface ProjectType {
  id?: string,
  creatorId: string
  creatorDisplayname: string
  title: string,
  urlSlug: string,
  startMonth: number,
  startYear: number,
  endMonth: number | null,
  endYear: number | null,
  inProgress: boolean,
  summary256?: string,
  description?: string,
  images?: ProjectImageType[],
  links?: ExternalLinkType[],
  timestamp: FieldValue,
}
*/

export const useGetSingleProject = () => {
    const [isPending, setIsPending] = useState(false)

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
      console.log(resultDocument)
      return resultDocument
    }
    return { isPending, getProject }
  }