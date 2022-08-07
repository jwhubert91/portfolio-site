import { ref, listAll, deleteObject } from 'firebase/storage'
import { storage } from '../firebase/config'

export type FileGroup = "images"
export type FileType = "profilePic" | "backgroundPic"

export const useStorage = ()=> {
  const getFilePath = (fileGroup: FileGroup, uid: string, fileType: FileType, fileName?: string): string => {
    return `${fileGroup}/${uid}/${fileType}${fileName ? `/${fileName}` : ""}`
  }

  const deleteFile = async (filepath: string)=> {
    const listRef = ref(storage, filepath)
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef)
        })
      }).catch((err) => console.log("Error deleting the file from storage: ", err.message))
  }

  return { getFilePath, deleteFile }
}