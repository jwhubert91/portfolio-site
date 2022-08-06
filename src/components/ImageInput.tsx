import { SyntheticEvent } from "react"
import Button from "./Button"
import { MdDeleteForever } from "react-icons/md"

interface ImagePreviewProps {
  containerClassName?: string
  imageClassName?: string
  previewUrl: string
  label: string
  onDelete: () => void
}

interface ImageInputProps {
  containerClassName?: string
  description?: string
  inputClasses?: string
  label: string
  onChange?: (e: SyntheticEvent) => void
  validation?: string
  previewUrl?: string
  previewSizeClasses?: string
  imageDeleteButtonLabel?: string
  onDelete: () => void
}

function ImagePreview({
  containerClassName = "",
  imageClassName = "",
  previewUrl,
  label,
  onDelete,
}: ImagePreviewProps) {
  return (
    <div className={`my-2 ${containerClassName}`}>
      <img className={imageClassName} src={previewUrl} alt={label} />
      <div className="my-2 flex items-start">
        <Button buttonStyle="ALERT" className="text-base" onClick={onDelete}>
          <MdDeleteForever className="text-2xl mr-2" />
          <span>Delete image</span>
        </Button>
      </div>
    </div>
  )
}

function ImageInput({
  containerClassName = "",
  description,
  inputClasses = "",
  label,
  onChange,
  validation,
  previewUrl = "",
  previewSizeClasses = "w-40 h-40",
  imageDeleteButtonLabel = "Delete image",
  onDelete,
}: ImageInputProps) {
  return (
    <label className={`text-left w-min ${containerClassName}`}>
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      {description && (
        <p className="text-xs italic text-black">{description}</p>
      )}
      <input type="file" className={`${inputClasses}`} onChange={onChange} />
      {validation && <p className="text-sm text-red-600">{validation}</p>}
      {previewUrl && (
        <ImagePreview
          imageClassName={previewSizeClasses}
          previewUrl={previewUrl}
          label={imageDeleteButtonLabel}
          onDelete={onDelete}
        />
      )}
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
