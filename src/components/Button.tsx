import React, { ReactNode } from "react"

type ButtonStyles =
  | "ALERT"
  | "PRIMARY_CTA"
  | "COMPACT_CTA"
  | "LARGE"
  | "CLEAN"
  | "PILL"
  | "PILL_LIGHT"
  | "PROFILE"

interface ButtonProps {
  children?: ReactNode | string
  className?: string
  onClick?: (e: React.SyntheticEvent) => void
  buttonStyle: ButtonStyles
  title?: string
  disabled?: boolean
}

function Button({
  buttonStyle,
  children,
  className = "",
  onClick,
  title = "",
  disabled = false,
}: ButtonProps) {
  const buttonInner = children
  const buttonClasses = `${getButtonStyle(buttonStyle)} ${className}`
  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      title={title}
      disabled={disabled}
    >
      {buttonInner}
    </button>
  )
}

export const getButtonStyle = (buttonStyle: ButtonStyles) => {
  switch (buttonStyle) {
    case "PRIMARY_CTA":
      return "pointer-events-auto text-snowWhite py-2 px-3 bg-primary rounded-md font-semibold hover:bg-indigo-500 text-xs sm:text-sm lg:text-base"
    case "COMPACT_CTA":
      return "pointer-events-auto text-snowWhite py-2 px-3 bg-primary rounded-md hover:bg-indigo-500 text-sm sm:text-base lg:text-md"
    case "ALERT":
      return "text-red-700 bg-snowWhite shadow py-2 px-3 rounded-md hover:text-snowWhite hover:bg-orangeRed flex justify-center"
    case "LARGE":
      return "text-xl md:text-3xl bg-primary hover:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white sm:font-semibold h-16 px-6 rounded-lg"
    case "CLEAN":
      return "text-xiketicBlack hover:text-primary font-medium underline"
    case "PILL":
      return "rounded-full text-culturedBlue border border-2 py-1 px-2 border-culturedBlue bg-xiketicBlack hover:bg-indigo-800"
    case "PILL_LIGHT":
      return "rounded-full text-xiketicBlack py-1 px-2 bg-culturedBlue hover:bg-slate-400"
    case "PROFILE":
      return "border border-1 text-xiketicBlack p-1 text-center"
    default:
      return ""
  }
}

export default Button
