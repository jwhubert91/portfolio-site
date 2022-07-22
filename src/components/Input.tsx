import { HTMLInputTypeAttribute, SyntheticEvent, ReactElement } from "react"

export const defaultInputClasses =
  "mt-1 focus:ring-indigo-500 p-2 sm:p-4 focus:border-indigo-500 block w-full shadow-sm text-sm sm:text-lg border border-gray-300 rounded-md"

interface InputProps {
  containerClassName?: string
  description?: string
  inputClassName?: string
  inputValue?: string | number | readonly string[] | undefined
  label?: string | ReactElement
  name?: string
  onChange?: (e: SyntheticEvent) => void
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

function Input({
  containerClassName = "",
  description = "",
  inputClassName = "",
  inputValue = "",
  label,
  name = "",
  onChange,
  placeholder = "",
  type = "text",
}: InputProps) {
  const inputClasses = `${defaultInputClasses} ${inputClassName}`
  return (
    <label className={`text-left ${containerClassName}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      {description && (
        <p className="text-xs italic text-black">{description}</p>
      )}
      <input
        type={type}
        className={inputClasses}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={inputValue}
      />
    </label>
  )
}

export default Input
