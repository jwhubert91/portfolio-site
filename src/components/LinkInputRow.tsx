import React, {
  HTMLInputTypeAttribute,
  SyntheticEvent,
  ReactElement,
} from "react"
import Input from "./Input"

interface LinkInputRowProps {
  containerClassName?: string
  linkNameInputValue?: string
  urlInputValue?: string
  onNameChange?: (e: SyntheticEvent) => void
  onURLChange?: (e: SyntheticEvent) => void
}

function LinkInputRow({
  containerClassName = "",
  linkNameInputValue = "",
  urlInputValue = "",
  onNameChange,
  onURLChange,
}: LinkInputRowProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row mb-2 p-2 rounded bg-culturedBlue ${containerClassName}`}
    >
      <Input
        inputValue={linkNameInputValue}
        containerClassName="p-0"
        inputClassName="text-sm sm:text-sm sm:p-0"
        label="link title"
        onChange={onNameChange}
        type="text"
      />
      <Input
        inputValue={urlInputValue}
        containerClassName="p-0 flex-auto"
        inputClassName="text-sm sm:text-sm sm:p-0"
        label="url"
        onChange={onURLChange}
        type="url"
      />
    </div>
  )
}

export default LinkInputRow
