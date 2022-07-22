import { ReactElement, SyntheticEvent } from "react"

interface CheckboxProps {
  label?: string
  labelClassName?: string
  containerClassName?: string
  inputClassName?: string
  onChange?: (e: SyntheticEvent) => void
  isCheckedOnDefault?: boolean
  isChecked?: boolean
}

function Checkbox({
  label,
  containerClassName = "",
  inputClassName = "",
  labelClassName = "",
  isChecked = false,
  onChange,
}: CheckboxProps): ReactElement {
  return (
    <label className={`flex items-center ${containerClassName}`}>
      <input
        type="checkbox"
        className={`${inputClassName}`}
        onChange={onChange}
        checked={isChecked}
      />
      {label && (
        <span
          className={`font-semibold text-xs text-slate-700 ml-1 ${labelClassName}`}
        >
          {label}
        </span>
      )}
    </label>
  )
}

export default Checkbox
