import { useEffect, useState } from "react"

// firebase
import { db } from "../firebase/config"
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore"
import { ProjectType } from "../utilities/types"

export const useProjectsCollection = (collectionName: string, displayName?: string)=> {
  const [documents, setDocuments] = useState<ProjectType[]>([])
  console.log(`Entered useProjectsCollection hook with collectionName ${collectionName} and displayName ${displayName}`)

  useEffect(()=> {
    let ref = collection(db, collectionName)
    const q = displayName ? query(ref, where("creatorDisplayname", "==", displayName), orderBy("timestamp", "desc")) : query(ref, orderBy("timestamp", "desc"))

    const unsub = onSnapshot(q, (snapshot)=> {
      // TODO: When the collection objects are finalized, type these two ignored values
      // @ts-ignore
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      // @ts-ignore
      console.log(results)
      // @ts-ignore
      setDocuments(results)
    })

    return ()=> unsub()
  },[collectionName, displayName])

  return { documents }
}