import { useAuthContext } from "../hooks/useAuthContext"

interface ProfileImageProps {
  className?: string
}

function ProfileImage({ className = "" }: ProfileImageProps) {
  const { user } = useAuthContext()
  return (
    <img
      src={user?.photoURL || ""}
      className={`w-24 h-24 sm:w-28 sm:h-28 border border-white border-2 rounded-full object-cover ${className}`}
      alt={user?.displayName || "profile image"}
    />
  )
}

export default ProfileImage
