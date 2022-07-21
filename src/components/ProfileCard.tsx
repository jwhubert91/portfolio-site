import { useNavigate } from "react-router-dom"
import Card from "./Card"
import PillLink from "./PillLink"
import ProfileImage from "./ProfileImage"
import CardAdminButton from "./CardAdminButton"
import { ExternalLinkType } from "../utilities/types"
import { MdShortcut, MdModeEdit } from "react-icons/md"
import { routes } from "../utilities/routes"

interface ProfileCardProps {
  title?: string
  location?: string
  bio?: string
  links?: ExternalLinkType[]
}

function ProfileCard({
  title = "",
  location = "",
  bio = "",
  links = [],
}: ProfileCardProps) {
  const backgroundImageSrc =
    "https://media.giphy.com/media/l0K47723zLLU11gac/giphy.gif"

  const LinkNodes = () => {
    if (links.length > 0) {
      const linkNodes = links.map((link, idx) => {
        const { title, url } = link
        if (title.length > 0 && url.length > 0) {
          return <PillLink label={title} url={url} key={idx} />
        }
      })
      return linkNodes
    } else {
      return <></>
    }
  }

  const navigate = useNavigate()

  const handleShareProfile = (): void => {
    console.log("Profile shared!")
  }

  const handleEditProfile = (): void => {
    navigate(routes.editProfile)
  }

  return (
    <Card>
      <div
        className="bg-xiketicBlack bg-cover h-36 md:h-52 flex items-end justify-center p-2"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      >
        <ProfileImage />
      </div>
      <div className="relative text-center p-2">
        <h2 className="text-2xl font-bold">James Hubert</h2>
        <p className="text-slate-600">@james</p>
        <p>{title}</p>
        <p className="mb-2">{location}</p>
        <p className="text-sm max-w-md mx-auto mb-4">{bio}</p>
        {links.length > 0 && (
          <div className="text-sm flex flex-wrap justify-center">
            {LinkNodes()}
          </div>
        )}
        <div className="absolute top-2 right-2">
          <CardAdminButton
            className="rounded sm:px-2"
            onClick={handleEditProfile}
            textLabel={"Edit"}
          >
            <MdModeEdit className="mx-auto" />
          </CardAdminButton>
          <CardAdminButton
            className="rounded ml-[3px]"
            onClick={handleShareProfile}
            textLabel={"Share Profile"}
          >
            <MdShortcut className="mx-auto" />
          </CardAdminButton>
        </div>
      </div>
    </Card>
  )
}

export default ProfileCard
