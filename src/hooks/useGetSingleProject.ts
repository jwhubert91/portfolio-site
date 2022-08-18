import { useState } from 'react'
import { DocumentData, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export interface RetrievedProjectType {
  id: string
  document: DocumentData
}

export const useGetSingleProject = () => {
    const [isPending, setIsPending] = useState(false)

    const getProject = async (profileHandle: string, projectSlug: string) => {
      setIsPending(true)
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
      setIsPending(false)
      return result
    }
    return { isPending, getProject }
  }