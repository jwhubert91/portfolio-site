import { HTMLInputTypeAttribute, SyntheticEvent, ReactElement } from "react"

interface InputProps {
  containerClassName?: string
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
  inputClassName = "",
  inputValue = "",
  label,
  name = "",
  onChange,
  placeholder = "",
  type = "text",
}: InputProps) {
  const inputClasses = `mt-1 focus:ring-indigo-500 p-2 sm:p-4 focus:border-indigo-500 block w-full shadow-sm text-sm sm:text-lg border border-gray-300 rounded-md ${inputClassName}`
  return (
    <label className={`text-left ${containerClassName}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
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
