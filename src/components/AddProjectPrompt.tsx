import Button from "./Button"
import { MdAddCircle } from "react-icons/md"

interface AddProjectPromptProps {
  className?: string
}

function AddProjectPrompt({ className = "" }: AddProjectPromptProps) {
  return (
    <Button
      buttonStyle="PILL"
      className={`w-full sm:py-2 bg-white text-black hover:text-white border border-2 border-xiketicBlack hover:border-snowWhite ${className}`}
    >
      <div className="flex items-center">
        <MdAddCircle className="mr-2 text-3xl sm:text-5xl" />
        Add new project
      </div>
    </Button>
  )
}

export default AddProjectPrompt
