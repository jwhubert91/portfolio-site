import React from "react"

interface ProfileImageProps {
  className?: string
}

function ProfileImage({ className = "" }: ProfileImageProps) {
  return (
    <img
      src="https://media-exp2.licdn.com/dms/image/C4E03AQGbNwOX9g-I3Q/profile-displayphoto-shrink_800_800/0/1517065249979?e=1663200000&v=beta&t=muyKo0HoeR99hhQcQsOvPdOWUZ6-J4deEDjIjic8qRI"
      className={`w-24 h-24 sm:w-28 sm:h-28 border border-white border-2 rounded-full object-cover ${className}`}
      alt="James Hubert"
    />
  )
}

export default ProfileImage
