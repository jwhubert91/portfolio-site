import React from "react"
import { Link } from "react-router-dom"
import { getPortfolioRoute } from "../utilities/routes"
import ProfileImage from "../components/ProfileImage"

interface ProfileLinkProps {
  displayName: string
  profileImageUrl?: string
}

function ProfileLink({ displayName, profileImageUrl = "" }: ProfileLinkProps) {
  return (
    <Link to={getPortfolioRoute(displayName)} className="flex items-center">
      <ProfileImage profileImageSrc={profileImageUrl} size="small" />
      <span className="ml-2 font-bold">{displayName}</span>
    </Link>
  )
}

export default ProfileLink
