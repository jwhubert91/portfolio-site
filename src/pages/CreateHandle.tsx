import React, { useState } from "react"
import { updateProfile } from "firebase/auth"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"
import Input from "../components/Input"
import PageLayout from "../components/PageLayout"
import { useAuthContext } from "../hooks/useAuthContext"
import { db } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getEditPortfolioRoute } from "../utilities/routes"

function CreateHandle() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isSubmitPending, setIsSubmitPending] = useState(false)

  const { user } = useAuthContext()
  const navigate = useNavigate()

  const addUsernameToAuthUser = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: username,
      })
    } else {
      setError("Please try again.")
    }
  }

  const addUsernameToUserDoc = async () => {
    await addDoc(collection(db, "users"), {
      userId: user?.uid,
      username,
    })
  }

  const isUsernameTaken = async (username: string) => {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("username", "==", username))
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
    // Check if username is taken
    const isUsernameAvailable = await isUsernameTaken(username)
    if (isUsernameAvailable) {
      setError("Sorry, that username is taken. Please try another.")
      setIsSubmitPending(false)
    } else {
      await addUsernameToAuthUser()
      await addUsernameToUserDoc()
        .then(() => {
          navigate(getEditPortfolioRoute(username))
        })
        .catch((err) => {
          setError(err.message)
        })
    }
    setIsSubmitPending(false)
  }

  return (
    <PageLayout className="flex flex-col" isNavAuthShown={false}>
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Let's get started" />
          <Input
            inputValue={username}
            label="Please choose a username"
            description="This is one of the easiest ways to find your portfolio"
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value
              setUsername(value.toLowerCase())
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
      </CenteredContent>
    </PageLayout>
  )
}

export default CreateHandle
