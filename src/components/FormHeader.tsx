import { ReactElement } from "react"

interface FormHeaderProps {
  className?: string
  title: string | ReactElement
}

function FormHeader({ className = "", title }: FormHeaderProps) {
  const headerClasses = `mb-4 text-2xl font-bold sm:text-3xl ${className}`
  return <h2 className={headerClasses}>{title}</h2>
}

export default FormHeader
