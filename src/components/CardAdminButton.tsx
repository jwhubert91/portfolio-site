import { ReactNode } from "react"
import Button from "./Button"

interface CardAdminButtonProps {
  className?: string
  children?: ReactNode
  textLabel: string
  onClick: () => void
}

function CardAdminButton({
  className = "",
  children,
  textLabel = "",
  onClick,
}: CardAdminButtonProps) {
  return (
    <Button
      buttonStyle="PROFILE"
      className={`rounded ${className}`}
      onClick={onClick}
    >
      {children}
      {textLabel && (
        <span className="text-[8px] hidden sm:block">{textLabel}</span>
      )}
    </Button>
  )
}

export default CardAdminButton
