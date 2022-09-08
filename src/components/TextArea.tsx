import { SyntheticEvent } from "react"
import { defaultInputClasses } from "./Input"

interface TextAreaProps {
  containerClassName?: string
  description?: string
  inputClassName?: string
  label?: string
  maxLength?: number
  placeholder?: string
  onChange?: (e: SyntheticEvent) => void
  inputValue?: string | number | readonly string[] | undefined
  required?: boolean
}

function TextArea({
  containerClassName = "",
  description,
  inputClassName = "",
  placeholder = "",
  label,
  maxLength = 9999,
  onChange,
  inputValue,
  required = false,
}: TextAreaProps) {
  return (
    <label className={`text-left mb-2 ${containerClassName}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      {(description || required) && (
        <p className="text-xs italic text-black">
          {required ? "Required. " : ""}
          {description}
        </p>
      )}
      <textarea
        className={`${inputClassName} ${defaultInputClasses}`}
        maxLength={maxLength}
        onChange={onChange}
        value={inputValue}
        placeholder={placeholder}
        required={required}
      />
    </label>
  )
}

export default TextArea
