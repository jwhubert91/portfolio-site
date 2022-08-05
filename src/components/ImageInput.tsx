import { SyntheticEvent } from "react"

interface ImageInputProps {
  containerClassName?: string
  description?: string
  inputClasses?: string
  label?: string
  onChange?: (e: SyntheticEvent) => void
  validation?: string
  previewUrl?: string
  previewClassName?: string
}

function ImageInput({
  containerClassName = "",
  description,
  inputClasses = "",
  label,
  onChange,
  validation,
  previewUrl,
  previewClassName,
}: ImageInputProps) {
  return (
    <label className={`text-left ${containerClassName}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      {description && (
        <p className="text-xs italic text-black">{description}</p>
      )}
      <input type="file" className={`${inputClasses}`} onChange={onChange} />
      {previewUrl && (
        <img
          className={`my-2 ${previewClassName}`}
          src={previewUrl}
          alt={label}
        />
      )}
      {validation && <p className="text-sm text-red-600">{validation}</p>}
    </label>
  )
}

export const validateImageChange = (
  e: SyntheticEvent,
  maxSizeInBytes: number,
  imageName: string
) => {
  let selected = (e.target as HTMLInputElement).files
  let image = selected ? selected[0] : null
  const maxSizeInMb = maxSizeInBytes / 1000000
  if (!image) {
    return {
      imageError: `${imageName} not selected`,
      validatedImage: null,
    }
  }
  if (!image?.type.includes("image")) {
    return {
      imageError: "Selected file must be an image",
      validatedImage: null,
    }
  }
  if (!!image && image.size > maxSizeInBytes) {
    return {
      imageError: `${imageName} must be smaller than ${maxSizeInMb} MB`,
      validatedImage: null,
    }
  }
  return {
    imageError: null,
    validatedImage: image,
  }
}

export default ImageInput
