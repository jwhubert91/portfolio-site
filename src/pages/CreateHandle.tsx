import React, { useState, useEffect, useRef, useCallback } from "react"
import { updateProfile } from "firebase/auth"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import Button from "../components/Button"
import PageInner from "../components/PageInner"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import { useAuthContext } from "../hooks/useAuthContext"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getEditPortfolioRoute, isDisplayNameValid } from "../utilities/routes"
import { ProfileType } from "../utilities/types"

function CreateHandle() {
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitPending, setIsSubmitPending] = useState(false)

  let newUserRef = useRef(true)

  const { user, authIsReady } = useAuthContext()
  const navigate = useNavigate()

  const addDisplayNameToAuthUser = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: displayName,
      })
    } else {
      setError("Please try again.")
    }
  }

  const addDisplayNameToUserDoc = async () => {
    await addDoc(collection(db, "users"), {
      userId: user?.uid,
      displayName,
    })
  }

  const isDisplayNameTaken = async (displayName: string) => {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("displayName", "==", displayName))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      return false
    } else {
      return true
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitPending(true)
    const isExistingUserWithUnchangedDisplayName: boolean =
      !newUserRef.current && displayName === user?.displayName
    if (isExistingUserWithUnchangedDisplayName) {
      // user exists and displayname is unchanged, send them to next page without db update
      navigate(getEditPortfolioRoute(displayName))
    }
    const isDisplayNameInUse = await isDisplayNameTaken(displayName)
    if (!isDisplayNameValid(displayName)) {
      setError(
        "Sorry, that displayName is reserved or uses special characters. Please try another."
      )
      setIsSubmitPending(false)
    } else if (isDisplayNameInUse) {
      setError("Sorry, that displayName is taken. Please try another.")
      setIsSubmitPending(false)
    } else {
      await addDisplayNameToAuthUser()
      await addDisplayNameToUserDoc()
        .then(() => {
          navigate(getEditPortfolioRoute(displayName))
        })
        .catch((err) => {
          setError(err.message)
        })
    }
    setIsSubmitPending(false)
  }

  const memoizedLoad = useCallback(async () => {
    setIsLoading(true)
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("userId", "==", user?.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const profileData: ProfileType = doc.data() as ProfileType
      newUserRef.current = profileData.displayName ? false : true
      if (!!user?.displayName) {
        setDisplayName(user.displayName)
      }
    })
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    if (authIsReady && user && user.displayName) {
      memoizedLoad()
    }
  }, [user, authIsReady, navigate, memoizedLoad])

  return (
    <PageLayout
      className="flex flex-col"
      isLoading={isLoading}
      isNavAuthShown={false}
    >
      <PageInner
        isVerticallyCentered={true}
        innerClassName="w-full sm:w-[540px]"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Let's get started" />
          <Input
            inputValue={displayName}
            label="Please choose a display name"
            description="This is one of the easiest ways to find your portfolio"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setDisplayName(value.toLowerCase())
            }}
            type=""
            required
          />
          {isSubmitPending ? (
            <Button buttonStyle="LARGE" className="mt-4" disabled>
              Create Profile
            </Button>
          ) : (
            <Button buttonStyle="LARGE" className="mt-4">
              Create Profile
            </Button>
          )}
          {error && <ErrorMessage error={error} className="my-2" />}
        </form>
      </PageInner>
    </PageLayout>
  )
}

export default CreateHandle
