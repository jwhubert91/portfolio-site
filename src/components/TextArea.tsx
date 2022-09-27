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
  rows?: number
  isCharacterCountDisplayed?: boolean
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
  rows = 3,
  isCharacterCountDisplayed = false,
}: TextAreaProps) {
  const currentValueLength: number | undefined = isCharacterCountDisplayed
    ? inputValue?.toString().length
    : 0
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
        className={`${defaultInputClasses} ${inputClassName}`}
        maxLength={maxLength}
        onChange={onChange}
        value={inputValue}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
      {isCharacterCountDisplayed && (
        <p className="text-xs italic text-black text-right">
          {currentValueLength}/{maxLength}
        </p>
      )}
    </label>
  )
}

export default TextArea
