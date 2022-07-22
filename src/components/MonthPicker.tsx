import { SyntheticEvent } from "react"
import { defaultInputClasses } from "./Input"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface MonthPickerProps {
  containerClassName?: string
  inputClassName?: string
  onChange?: (e: SyntheticEvent) => void
}

function MonthPicker({
  containerClassName = "",
  inputClassName = "",
}: MonthPickerProps) {
  return (
    <label className={containerClassName}>
      <span></span>
      <select className={`${defaultInputClasses} ${inputClassName}`}>
        <option value={months[0]}>{months[0]}</option>
        <option value={months[1]}>{months[1]}</option>
        <option value={months[2]}>{months[2]}</option>
        <option value={months[3]}>{months[3]}</option>
        <option value={months[4]}>{months[4]}</option>
        <option value={months[5]}>{months[5]}</option>
        <option value={months[6]}>{months[6]}</option>
        <option value={months[7]}>{months[7]}</option>
        <option value={months[8]}>{months[8]}</option>
        <option value={months[9]}>{months[9]}</option>
        <option value={months[10]}>{months[10]}</option>
        <option value={months[11]}>{months[11]}</option>
      </select>
    </label>
  )
}

export default MonthPicker
