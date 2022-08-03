import React, { useEffect, useState } from "react"
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
import { routes } from "../utilities/routes"

function CreateHandle() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isQueryPending, setIsQueryPending] = useState(false)
  const [isSubmitPending, setIsSubmitPending] = useState(false)
  const [isUsernameTaken, setIsUsernameTaken] = useState<boolean | null>(null)

  const { user } = useAuthContext()
  const navigate = useNavigate()

  const addUsernameToUserDoc = async () => {
    await addDoc(collection(db, "users"), {
      userId: user?.uid,
      username,
    })
      .then(() => {
        navigate(routes.editProfile)
      })
      .catch((err) => {
        setError(err.message)
      })
    setIsSubmitPending(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitPending(true)
    setIsQueryPending(true)
    // Check if username exists
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("username", "==", username))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      setIsUsernameTaken(false)
    } else {
      setIsUsernameTaken(true)
      setError("Sorry, that username is taken. Please try another.")
      setIsSubmitPending(false)
    }
    setIsQueryPending(false)
  }

  useEffect(() => {
    if (!isQueryPending && isUsernameTaken === false) {
      if (!error) {
        addUsernameToUserDoc()
      }
    }
  }, [isQueryPending, isUsernameTaken, error, addUsernameToUserDoc])

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
