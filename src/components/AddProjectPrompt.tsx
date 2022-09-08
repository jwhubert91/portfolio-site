import Button from "./Button"
import { MdAddCircleOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { getNewProjectRoute } from "../utilities/routes"
import { useAuthContext } from "../hooks/useAuthContext"

interface AddProjectPromptProps {
  className?: string
}

function AddProjectPrompt({ className = "" }: AddProjectPromptProps) {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const handleClick = () => {
    if (!!user && user?.displayName) {
      navigate(getNewProjectRoute(user.displayName))
    }
  }
  return (
    <Button
      buttonStyle="COMPACT_CTA"
      className={`flex items-center ${className}`}
      onClick={handleClick}
    >
      <MdAddCircleOutline className="text-3xl" />
      <span className="ml-2">Add new project</span>
    </Button>
  )
}

export default AddProjectPrompt
