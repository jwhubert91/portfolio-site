import { defaultInputClasses } from "./Input"

interface TextAreaProps {
  containerClassName?: string
  inputClassName?: string
  label?: string
  maxLength?: number
}

function TextArea({
  containerClassName = "",
  inputClassName = "",
  label,
  maxLength = 9999,
}: TextAreaProps) {
  return (
    <label className={`text-left mb-2 ${containerClassName}`}>
      {label && <span className="text-sm">{label}</span>}
      <textarea
        className={`${inputClassName} ${defaultInputClasses}`}
        maxLength={maxLength}
      />
    </label>
  )
}

export default TextArea
