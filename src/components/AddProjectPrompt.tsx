import Button from "./Button"
import { MdAddCircleOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { routes } from "../utilities/routes"
import { makePath } from "../utilities/helpers"

interface AddProjectPromptProps {
  className?: string
}

function AddProjectPrompt({ className = "" }: AddProjectPromptProps) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(makePath(routes.projects, routes.createProject))
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
