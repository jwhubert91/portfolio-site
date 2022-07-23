interface ImageInputProps {
  containerClassName?: string
  description?: string
  inputClasses?: string
  label?: string
}

function ImageInput({
  containerClassName = "",
  description,
  inputClasses = "",
  label,
}: ImageInputProps) {
  return (
    <label className={`text-left ${containerClassName}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      {description && (
        <p className="text-xs italic text-black">{description}</p>
      )}
      <input type="file" className={`${inputClasses}`} />
    </label>
  )
}

export default ImageInput
