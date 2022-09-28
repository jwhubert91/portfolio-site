import React, { useEffect, useState, useRef, useCallback } from "react"
// import { MdDeleteForever } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import {
  updateDoc,
  where,
  getDocs,
  collection,
  query,
} from "firebase/firestore"
import { useAuthContext } from "../hooks/useAuthContext"
import PageLayout from "../components/PageLayout"
import PageInner from "../components/PageInner"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import LinkInputRow from "../components/LinkInputRow"
import Button from "../components/Button"
import { getPortfolioRoute } from "../utilities/routes"
import ImageInput, { validateImageChange } from "../components/ImageInput"
import { db, storage } from "../firebase/config"
import ErrorMessage from "../components/ErrorMessage"
import { ProfileType } from "../utilities/types"
import { permissionsLevels } from "../utilities/constants"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { useStorage } from "../hooks/useStorage"

function EditProfile() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [profilePicUrl, setProfilePicUrl] = useState<string>("")
  const [profilePicError, setProfilePicError] = useState("")
  const [backgroundPic, setBackgroundPic] = useState<File | null>(null)
  const [backgroundPicUrl, setBackgroundPicUrl] = useState<string>("")
  const [backgroundPicError, setBackgroundPicError] = useState("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [pronouns, setPronouns] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [link1Name, setLink1Name] = useState("")
  const [link1Url, setLink1Url] = useState("")
  const [link2Name, setLink2Name] = useState("")
  const [link2Url, setLink2Url] = useState("")
  const [link3Name, setLink3Name] = useState("")
  const [link3Url, setLink3Url] = useState("")
  const [link4Name, setLink4Name] = useState("")
  const [link4Url, setLink4Url] = useState("")
  const [link5Name, setLink5Name] = useState("")
  const [link5Url, setLink5Url] = useState("")

  let newUserRef = useRef(true)
  const { user, authIsReady } = useAuthContext()
  const { getFilePath, deleteFile } = useStorage()
  const navigate = useNavigate()

  const fillInputs = ({
    firstName,
    lastName,
    pronouns = "",
    title,
    location = "",
    bio = "",
    profileImageUrl,
    backgroundImageUrl,
    profileLink1,
    profileLink2,
    profileLink3,
    profileLink4,
    profileLink5,
  }: ProfileType) => {
    setFirstName(firstName)
    setLastName(lastName)
    setPronouns(pronouns)
    setTitle(title)
    setLocation(location)
    setBio(bio)
    setLink1Name(profileLink1?.title)
    setLink1Url(profileLink1?.url)
    setLink2Name(profileLink2?.title)
    setLink2Url(profileLink2?.url)
    setLink3Name(profileLink3?.title)
    setLink3Url(profileLink3?.url)
    setLink4Name(profileLink4?.title)
    setLink4Url(profileLink4?.url)
    setLink5Name(profileLink5?.title)
    setLink5Url(profileLink5?.url)
    setBackgroundPicUrl(backgroundImageUrl || "")
    setProfilePicUrl(profileImageUrl || "")
  }

  const validate = () => {
    setError("")
    if (firstName === undefined) {
      setError("Please enter a first name")
      return false
    }
    if (lastName === undefined) {
      setError("Please enter a last name")
      return false
    }
    if (title === undefined) {
      setError("Please enter your professional title")
      return false
    }
    return true
  }

  // useCallback to get rid of useEffect missing deps warning for functions --
  // https://bobbyhadz.com/blog/react-hook-useeffect-has-missing-dependency

  const memoizedLoad = useCallback(async () => {
    setIsLoading(true)
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("userId", "==", user?.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const profileData: ProfileType = doc.data() as ProfileType
      newUserRef.current = profileData.firstName ? false : true
      fillInputs(profileData)
    })
    setIsLoading(false)
  }, [user])

  const uploadImages = async () => {
    let imageUrls = {
      profileUrl: "",
      backgroundUrl: "",
    }
    // upload user thumbnail
    if (user?.uid) {
      const { uid } = user
      if (!!profilePic) {
        const uploadPath: string = getFilePath(
          "images",
          uid,
          "profilePic",
          profilePic.name
        )
        const storageRef = ref(storage, uploadPath)
        await uploadBytes(storageRef, profilePic)
          .then(async (snapshot) => {
            imageUrls.profileUrl = await getDownloadURL(snapshot.ref)
          })
          .catch((err) => {
            setProfilePicError(err.message)
          })
      }
      if (!!backgroundPic) {
        const uploadPath: string = getFilePath(
          "images",
          uid,
          "backgroundPic",
          backgroundPic.name
        )
        const storageRef = ref(storage, uploadPath)
        await uploadBytes(storageRef, backgroundPic)
          .then(async (snapshot) => {
            imageUrls.backgroundUrl = await getDownloadURL(snapshot.ref)
          })
          .catch((err) => {
            setBackgroundPicError(err.message)
          })
      }
    }
    return imageUrls
  }

  const saveProfile = async (imageUrls: {
    profileUrl: string
    backgroundUrl: string
  }) => {
    // 1 - save the profile image, displayname, and full name to the user's auth document
    if (user && !error) {
      await updateProfile(user, {
        photoURL: imageUrls.profileUrl,
      })
        .then((res) => res)
        .catch((err) => {
          console.log(
            "There was an error saving the profile image. ",
            err.message
          )
          setError("There was an error saving the profile image.")
        })
    }
    // 2 - second, query for the current user's User document in firestore
    if (error) {
      return
    }
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("userId", "==", user?.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // 3 - get the data and the reference object from the document
      const profileData = doc.data()
      const profileRef = doc.ref
      // 4 - update the document
      updateDoc(profileRef, {
        ...profileData,
        profileType: permissionsLevels[0],
        firstName,
        lastName,
        pronouns,
        title,
        location,
        bio,
        backgroundImageUrl: imageUrls.backgroundUrl,
        profileImageUrl: imageUrls.profileUrl,
        profileLink1: {
          title: link1Name || "",
          url: link1Url || "",
        },
        profileLink2: {
          title: link2Name || "",
          url: link2Url || "",
        },
        profileLink3: {
          title: link3Name || "",
          url: link3Url || "",
        },
        profileLink4: {
          title: link4Name || "",
          url: link4Url || "",
        },
        profileLink5: {
          title: link5Name || "",
          url: link5Url || "",
        },
      })
        // 5 - handle the promise
        .catch((err) => {
          setError(err.message)
        })
    })
  }

  useEffect(() => {
    if (authIsReady) {
      memoizedLoad()
    }
  }, [authIsReady, memoizedLoad])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const isReady = validate()
    if (isReady) {
      let { profileUrl, backgroundUrl } = await uploadImages()
      await saveProfile({
        profileUrl: profileUrl ? profileUrl : profilePicUrl,
        backgroundUrl: backgroundUrl ? backgroundUrl : backgroundPicUrl,
      })
      if (user?.displayName) {
        const portfolioRoute = getPortfolioRoute(user.displayName)
        navigate(portfolioRoute)
      } else {
        setError("There was an error. Please try again.")
      }
    }
    setIsLoading(false)
  }

  // const handleDeactivate = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // TODO
  //   console.log("Profile deactivated")
  // }

  return (
    <PageLayout
      className="flex flex-col"
      isNavAuthShown={newUserRef.current ? false : true}
      isLoading={isLoading}
      helmetTitle="Edit Profile"
      helmetDescription="Edit your profile"
      invisibleH1Title="Profile edit page - Edit your Portful profile"
    >
      <PageInner innerClassName="w-full sm:w-[540px] lg:w-full py-4">
        <form className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white">
          <FormHeader className="mb-2" title="Edit Profile" />
          <p className="text-md mb-2 lg:mb-8 text-slate-500">
            Introduce yourself to the community
          </p>
          <div className="flex flex-col lg:flex-row gap-x-8 mb-4">
            <div className="flex-1 flex flex-col justify-start">
              <Input
                containerClassName="mb-2"
                inputValue={firstName}
                label="First Name"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setFirstName(value)
                }}
                type="text"
                required
              />
              <Input
                containerClassName="mb-2"
                inputValue={lastName}
                label="Last Name"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLastName(value)
                }}
                type="text"
                required
              />
              <Input
                containerClassName="mb-2"
                inputValue={pronouns}
                label="Pronouns"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setPronouns(value)
                }}
                type="text"
              />
              <Input
                containerClassName="mb-2"
                inputValue={title}
                label="Title 💼"
                placeholder="Architect, Designer, Web Developer"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setTitle(value)
                }}
                type="text"
                required
              />
              <Input
                containerClassName="mb-2"
                inputValue={location}
                label="Location 🌎"
                placeholder="New York, NY"
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLocation(value)
                }}
                type="text"
              />
              <TextArea
                label="A Short Bio 👀"
                description="256 characters to tell your fellow humans who you are"
                placeholder="I am a..."
                maxLength={256}
                inputClassName={"sm:font-sm"}
                rows={6}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setBio(value)
                }}
                inputValue={bio}
                isCharacterCountDisplayed={true}
              />
              {/* Net Ninja videos on uploading images are: 160 */}
              <ImageInput
                containerClassName="py-2 mb-2"
                label="Profile Picture 📸"
                description="A square headshot is best. Less than 1 MB"
                onChange={(e) => {
                  setProfilePic(null)
                  setProfilePicError("")
                  let { imageError, validatedImage } = validateImageChange(
                    e,
                    1000000,
                    "profile image"
                  )
                  if (imageError) {
                    setProfilePicError(imageError)
                  } else {
                    setProfilePic(validatedImage)
                  }
                }}
                validation={profilePicError}
                previewUrl={
                  profilePic ? URL.createObjectURL(profilePic) : profilePicUrl
                }
                onDelete={(e) => {
                  e.preventDefault()
                  setIsLoading(true)
                  setProfilePic(null)
                  setProfilePicError("")
                  if (profilePicUrl) {
                    setProfilePicUrl("")
                    const filepath = getFilePath(
                      "images",
                      user ? user.uid : "",
                      "profilePic"
                    )
                    deleteFile(filepath).then(() => {
                      user &&
                        updateProfile(user, {
                          photoURL: "",
                        })
                      saveProfile({
                        profileUrl: "",
                        backgroundUrl: backgroundPicUrl,
                      })
                    })
                  }
                  setIsLoading(false)
                }}
                isSelectShown={!profilePic && !profilePicUrl}
              />
              <ImageInput
                containerClassName="py-2 mb-2"
                label="Background Image 🌉"
                description="A wide or landscape image works best here. Less than 1 MB."
                onChange={(e) => {
                  setBackgroundPic(null)
                  setBackgroundPicError("")
                  let { imageError, validatedImage } = validateImageChange(
                    e,
                    1000000,
                    "background image"
                  )
                  if (imageError) {
                    setBackgroundPicError(imageError)
                  } else {
                    setBackgroundPic(validatedImage)
                  }
                }}
                validation={backgroundPicError}
                previewUrl={
                  backgroundPic
                    ? URL.createObjectURL(backgroundPic)
                    : backgroundPicUrl
                }
                previewSizeClasses="h-40"
                onDelete={(e) => {
                  e.preventDefault()
                  setIsLoading(true)
                  setBackgroundPic(null)
                  setBackgroundPicError("")
                  if (backgroundPicUrl) {
                    setBackgroundPicUrl("")
                    const filepath = getFilePath(
                      "images",
                      user ? user.uid : "",
                      "backgroundPic"
                    )
                    deleteFile(filepath).then(async () => {
                      await saveProfile({
                        profileUrl: profilePicUrl,
                        backgroundUrl: "",
                      })
                    })
                  }
                  setIsLoading(false)
                }}
                isSelectShown={!backgroundPic && !backgroundPicUrl}
              />
            </div>
            <div className="flex-1 flex flex-col lg:justify-start">
              <div className="mb-2 text-left">
                <h4 className="block text-sm font-medium text-gray-700">
                  Personal Links 🔗
                </h4>
                <p className="text-xs italic text-black">
                  Add up to 5 links to social media, a website, etc.
                </p>
              </div>
              <LinkInputRow
                linkNameInputValue={link1Name}
                urlInputValue={link1Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink1Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink1Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link2Name}
                urlInputValue={link2Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink2Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink2Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link3Name}
                urlInputValue={link3Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink3Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink3Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link4Name}
                urlInputValue={link4Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink4Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink4Url(value)
                }}
              />
              <LinkInputRow
                linkNameInputValue={link5Name}
                urlInputValue={link5Url}
                onNameChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink5Name(value)
                }}
                onURLChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setLink5Url(value)
                }}
              />
            </div>
          </div>
          {error && <ErrorMessage error={error} className="my-2" />}
          <Button
            buttonStyle="LARGE"
            className="mb-8 w-full lg:w-1/2 mx-auto"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Publish
          </Button>
          {/* TODO: Handle deactivate
           {!newUserRef.current && (
            <Button
              buttonStyle="ALERT"
              className="w-full lg:w-1/2 mx-auto text-xl"
              onClick={handleDeactivate}
              disabled={isLoading}
            >
              <MdDeleteForever className="text-3xl mr-2" />
              <span>Deactivate Profile</span>
            </Button>
          )} */}
        </form>
      </PageInner>
    </PageLayout>
  )
}

export default EditProfile
