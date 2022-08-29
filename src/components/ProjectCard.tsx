import { useNavigate, Link } from "react-router-dom"
import Card from "./Card"
import PillLink from "./PillLink"
import { months } from "../utilities/helpers"
import { ProjectType } from "../utilities/types"
import CardAdminButton from "./CardAdminButton"
import { MdModeEdit } from "react-icons/md"
import { getProjectDetailRoute, getEditProjectRoute } from "../utilities/routes"
import { useAuthContext } from "../hooks/useAuthContext"

interface ProjectCardProps {
  isCurrentUserProject?: boolean
  projectData: ProjectType
}

function ProjectCard({
  isCurrentUserProject = false,
  projectData,
}: ProjectCardProps) {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const startDateString = `${months[projectData.startMonth]} ${
    projectData.startYear
  }`
  const endDateString = projectData.inProgress
    ? "In Progress"
    : `${projectData.endMonth ? months[projectData.endMonth] : ""} ${
        projectData.endYear
      }`
  const completeDateString = `${startDateString} - ${endDateString}`

  const handleEditProject = () => {
    if (user && user.displayName) {
      navigate(getEditProjectRoute(user.displayName, projectData.urlSlug))
    }
  }

  const projectDetailPath = getProjectDetailRoute(
    projectData.creatorDisplayname,
    projectData.urlSlug
  )

  return (
    <Card className="my-2 px-8 py-4 relative">
      {/* Change route to project page when it's ready */}
      <Link to={projectDetailPath}>
        <h3 className="font-bold text-lg">{projectData.title}</h3>
        <p className="text-slate-500">{completeDateString}</p>
        <p className="text-xs sm:text-sm my-2">{projectData.summary256}</p>
        {projectData.images && projectData.images.length > 0 && (
          <div className="mb-2 p-4 h-108 border border-1 border-mutedGray rounded overflow-hidden">
            <img
              src={projectData.images[0].url}
              alt={projectData.images[0].title}
              className="cover"
            />
          </div>
        )}
      </Link>
      <div className="text-xs flex flex-wrap justify-center my-1">
        {projectData.links &&
          projectData.links.map((link, idx) => {
            if (link.title.length > 0 && link.url.length > 0) {
              return <PillLink url={link.url} label={link.title} key={idx} />
            } else {
              return null
            }
          })}
      </div>
      <Link to={projectDetailPath}>
        <p className="text-right font-medium underline cursor-pointer text-slate-700">
          See project details
        </p>
      </Link>
      {isCurrentUserProject && (
        <CardAdminButton
          className="rounded sm:px-2 absolute top-2 right-2"
          onClick={handleEditProject}
          textLabel={"Edit"}
        >
          <MdModeEdit className="mx-auto" />
        </CardAdminButton>
      )}
    </Card>
  )
}

export default ProjectCard
