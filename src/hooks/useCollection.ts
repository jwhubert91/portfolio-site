import { useEffect, useState } from "react"

// firebase
import { db } from "../firebase/config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

export const useCollection = (collectionName: string)=> {
  const [documents, setDocuments] = useState(null)

  useEffect(()=> {
    let ref = collection(db, collectionName)
    const q = query(ref, orderBy("timestamp", "desc"))

    const unsub = onSnapshot(q, (snapshot)=> {
      // TODO: When the collection objects are finalized, type these two ignored values
      // @ts-ignore
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      // @ts-ignore
      setDocuments(results)
    })

    return ()=> unsub()
  },[collectionName])

  return { documents }
}