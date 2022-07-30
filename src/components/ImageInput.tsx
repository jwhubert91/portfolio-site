import { SyntheticEvent } from "react"

interface ImageInputProps {
  containerClassName?: string
  description?: string
  inputClasses?: string
  label?: string
  onChange?: (e: SyntheticEvent) => void
  validation?: string
  preview?: File | null
  previewClassName?: string
}

function ImageInput({
  containerClassName = "",
  description,
  inputClasses = "",
  label,
  onChange,
  validation,
  preview,
  previewClassName,
}: ImageInputProps) {
  const previewURL = preview ? URL.createObjectURL(preview) : ""
  return (
    <label className={`text-left ${containerClassName}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      {description && (
        <p className="text-xs italic text-black">{description}</p>
      )}
      <input type="file" className={`${inputClasses}`} onChange={onChange} />
      {preview && <img className={previewClassName} src={previewURL} />}
      {validation && <p className="text-sm text-red-600">{validation}</p>}
    </label>
  )
}

interface validateImageResultProps {
  imageError: string | null
  validatedImage: File | null
}

export const validateImageChange = (
  e: SyntheticEvent,
  maxSizeInBytes: number,
  imageName: string
) => {
  let selected = (e.target as HTMLInputElement).files
  let image = selected ? selected[0] : null
  const maxSizeInMb = maxSizeInBytes / 1000000
  let results: validateImageResultProps = {
    imageError: null,
    validatedImage: null,
  }
  if (!image) {
    return (results = {
      imageError: `${imageName} not selected`,
      validatedImage: null,
    })
  }
  if (!image?.type.includes("image")) {
    return (results = {
      imageError: "Selected file must be an image",
      validatedImage: null,
    })
  }
  if (!!image && image.size > maxSizeInBytes) {
    return (results = {
      imageError: `${imageName} must be smaller than ${maxSizeInMb} MB`,
      validatedImage: null,
    })
  }
  return (results = {
    imageError: null,
    validatedImage: image,
  })
}

export default ImageInput
