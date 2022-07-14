import { ReactElement } from "react"

type ButtonStyles = "PRIMARY_CTA" | "SECONDARY_CTA" | "LARGE"

interface ButtonProps {
  children?: ReactElement | string
  className?: string
  onClick?: () => void
  buttonStyle: ButtonStyles
}

function Button({
  buttonStyle,
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const buttonInner = children
  const buttonClasses = `${getButtonStyle(buttonStyle)} ${className}`
  return (
    <button onClick={onClick} className={buttonClasses}>
      {buttonInner}
    </button>
  )
}

export const getButtonStyle = (buttonStyle: ButtonStyles) => {
  switch (buttonStyle) {
    case "PRIMARY_CTA":
      return "pointer-events-auto text-snowWhite py-2 px-3 bg-primary rounded-md font-semibold hover:bg-indigo-500 text-xs sm:text-sm lg:text-base"
    case "LARGE":
      return "text-xl md:text-3xl bg-primary hover:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white sm:font-semibold h-16 px-6 rounded-lg"
    default:
      break
  }
}

export default Button
