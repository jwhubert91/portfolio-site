import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config'

export type FileGroup = "images"
export type FileType = "profilePic" | "backgroundPic" | "projects"

export interface UploadResponse {
  downloadUrl: string | null
  error: string | null
}

export const useStorage = ()=> {
  const getFilePath = (fileGroup: FileGroup, uid: string, fileType: FileType, fileName?: string): string => {
    return `${fileGroup}/${uid}/${fileType}/${fileName ? `${fileName}` : ""}`
  }

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    .then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(snapshot.ref)
      return downloadUrl
    })
    .catch((err) => {
      console.log(`There was an error uploading the file ${file.name}: `, err.message)
    })
  }

  const deleteFile = async (filepath: string)=> {
    const fileRef = ref(storage, filepath)
    deleteObject(fileRef).then((res) => {
      console.log("file deleted from storage")
    })
    .catch((err) => console.log("Error deleting the file from storage: ", err.message))
  }

  return { getFilePath, deleteFile, uploadFile }
}