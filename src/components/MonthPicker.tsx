import { SyntheticEvent } from "react"
import { defaultInputClasses } from "./Input"
import { months } from "../utilities/helpers"

interface MonthPickerProps {
  containerClassName?: string
  description?: string
  inputClassName?: string
  labelClassName?: string
  label?: string
  onChange?: (e: SyntheticEvent) => void
}

function MonthPicker({
  containerClassName = "",
  description,
  inputClassName = "",
  labelClassName = "",
  label = "",
  onChange,
}: MonthPickerProps) {
  const monthOptions = months.map((month, idx) => (
    <option value={month} key={idx}>
      {month}
    </option>
  ))
  return (
    <label className={`text-left ${containerClassName}`} onChange={onChange}>
      {label && (
        <span
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </span>
      )}
      {description && (
        <p className="text-xs italic text-black">{description}</p>
      )}
      <select className={`${defaultInputClasses} ${inputClassName}`}>
        {monthOptions}
      </select>
    </label>
  )
}

export default MonthPicker
