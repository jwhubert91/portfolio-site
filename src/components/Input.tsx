import React, { HTMLInputTypeAttribute, SyntheticEvent } from "react"

interface InputProps {
  className?: string
  name?: string
  onChange?: (e: SyntheticEvent) => void
  type?: HTMLInputTypeAttribute
}

function Input({
  className = "",
  name = "",
  onChange,
  type = "text",
}: InputProps) {
  const inputClasses = `mt-1 focus:ring-indigo-500 p-4 text-lg focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md ${className}`
  return (
    <input
      type={type}
      className={inputClasses}
      name={name}
      onChange={onChange}
    />
  )
}

export default Input
