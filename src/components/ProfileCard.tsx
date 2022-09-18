import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { useAuthContext } from "../hooks/useAuthContext"
import Card from "./Card"
import PillLink from "./PillLink"
import ProfileImage from "./ProfileImage"
import CardAdminButton from "./CardAdminButton"
import { ExternalLinkType } from "../utilities/types"
import { MdShortcut, MdModeEdit } from "react-icons/md"
import { getEditPortfolioRoute } from "../utilities/routes"

interface ProfileCardProps {
  className?: string
  title?: string
  location?: string
  bio?: string
  links?: ExternalLinkType[]
  backgroundImageSrc?: string
  profileImageSrc?: string
  isCurrentUserPortfolio?: boolean
  fullName: string
  handle: string
}

function ProfileCard({
  className = "",
  title = "",
  location = "",
  bio = "",
  links = [],
  backgroundImageSrc = "",
  profileImageSrc = "",
  isCurrentUserPortfolio = false,
  fullName,
  handle,
}: ProfileCardProps) {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleShareProfile = (): void => {
    // TODO: generate link to current url and copy to clipboard
    const currentHost = window.location.hostname
    const profileLink = "https://" + currentHost + "/" + handle
    navigator.clipboard.writeText(profileLink)
    toast("Profile link 🔗 copied to clipboard!")
  }

  const handleEditProfile = (): void => {
    if (user?.displayName) {
      navigate(getEditPortfolioRoute(user.displayName))
    }
  }

  const LinkNodes = () => {
    if (links.length > 0) {
      const linkNodes = links.map((link: ExternalLinkType, idx) => {
        const { title, url } = link
        if (title.length > 0 && url.length > 0) {
          return <PillLink label={title} url={url} key={idx} />
        } else {
          return null
        }
      })
      return linkNodes
    } else {
      return <></>
    }
  }

  return (
    <Card className={className}>
      <div
        className={`bg-white bg-cover h-32 ${
          backgroundImageSrc && "md:h-52 p-2"
        } flex items-center md:items-end justify-center`}
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      >
        <ProfileImage profileImageSrc={profileImageSrc} />
      </div>
      <div className="relative text-center p-2">
        <h2 className="text-2xl font-bold">{fullName}</h2>
        <p className="text-slate-600">{handle}</p>
        <p>{title}</p>
        <p className="mb-2">{location}</p>
        <p className="text-sm max-w-md mx-auto mb-4">{bio}</p>
        {links.length > 0 && (
          <div className="text-sm flex flex-wrap justify-center">
            {LinkNodes()}
          </div>
        )}
        <div className="absolute top-2 right-2">
          {isCurrentUserPortfolio && (
            <CardAdminButton
              className="rounded sm:px-2"
              onClick={handleEditProfile}
              textLabel={"Edit"}
            >
              <MdModeEdit className="mx-auto" />
            </CardAdminButton>
          )}
          <CardAdminButton
            className="rounded ml-[3px]"
            onClick={handleShareProfile}
            textLabel={"Share Profile"}
          >
            <MdShortcut className="mx-auto" />
          </CardAdminButton>
        </div>
      </div>
      <Toaster />
    </Card>
  )
}

export default ProfileCard
