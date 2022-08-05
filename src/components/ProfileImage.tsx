import { ReactElement } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import "./ProfileImage.css"

interface ProfileImageProps {
  className?: string
  profileImageSrc?: string
}

function ProfileImage({
  className = "",
  profileImageSrc = "",
}: ProfileImageProps) {
  const { user } = useAuthContext()
  const sizeClasses = "w-24 h-24 sm:w-28 sm:h-28"
  const borderClasses = "border border-white border-2 rounded-full"
  const ImageComponent = (): ReactElement => {
    return (
      <img
        src={profileImageSrc}
        className={` object-cover ${sizeClasses} ${borderClasses} ${className}`}
        alt={user?.displayName || "profile image"}
      />
    )
  }
  const GradientComponent = (): ReactElement => {
    return (
      <div
        className={`profileImageGradient ${sizeClasses} ${borderClasses} ${className}`}
      ></div>
    )
  }
  return <>{profileImageSrc ? <ImageComponent /> : <GradientComponent />}</>
}

export default ProfileImage
