import { MdShortcut } from "react-icons/md"
import Button from "./Button"

interface ShareButtonProps {
  className?: string
}

function ShareButton({ className = "" }: ShareButtonProps) {
  return (
    <Button buttonStyle="SHARE" className={className}>
      <MdShortcut className="mx-auto" />
      <span className="text-[8px] hidden sm:block">Share Profile</span>
    </Button>
  )
}

export default ShareButton
