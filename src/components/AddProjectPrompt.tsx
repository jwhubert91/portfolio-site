import Button from "./Button"
import { MdAddCircle } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { routes } from "../utilities/routes"

interface AddProjectPromptProps {
  className?: string
}

function AddProjectPrompt({ className = "" }: AddProjectPromptProps) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(routes.createProject)
  }
  return (
    <Button
      buttonStyle="PILL"
      className={`w-full sm:py-2 bg-white text-black hover:text-white border border-2 border-xiketicBlack hover:border-snowWhite ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <MdAddCircle className="mr-2 text-3xl sm:text-5xl" />
        Add new project
      </div>
    </Button>
  )
}

export default AddProjectPrompt
