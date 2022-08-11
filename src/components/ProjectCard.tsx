import { useNavigate, Link } from "react-router-dom"
import Card from "./Card"
import PillLink from "./PillLink"
import { getMonthStringFromInteger, makePath } from "../utilities/helpers"
import { ProjectType } from "../utilities/types"
import CardAdminButton from "./CardAdminButton"
import { MdModeEdit } from "react-icons/md"
import { routes } from "../utilities/routes"

interface ProjectCardProps {
  isCurrentUserProject?: boolean
  projectData: ProjectType
}

function ProjectCard({
  isCurrentUserProject = false,
  projectData,
}: ProjectCardProps) {
  const startDateString = `${getMonthStringFromInteger(
    projectData.startMonth
  )} ${projectData.startYear}`
  const endDateString = projectData.inProgress
    ? "In Progress"
    : `${getMonthStringFromInteger(projectData.startMonth)} ${
        projectData.startYear
      }`
  const completeDateString = `${startDateString} - ${endDateString}`
  const navigate = useNavigate()
  const handleEditProject = () => {
    navigate(routes.createProject)
  }
  const path = makePath(routes.projects, String(projectData.id))
  return (
    <Card className="my-2 px-8 py-4 relative">
      {/* Change route to project page when it's ready */}
      <Link to={path}>
        <h3 className="font-bold text-lg">{projectData.title}</h3>
        <p className="text-slate-500">{completeDateString}</p>
        <p className="text-xs sm:text-sm my-2">{projectData.summary256}</p>
        {projectData.images && (
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
        {projectData.projectLink1 && (
          <PillLink
            url={projectData.projectLink1.url}
            label={projectData.projectLink1.title}
          />
        )}
        {projectData.projectLink2 && (
          <PillLink
            url={projectData.projectLink2.url}
            label={projectData.projectLink2.title}
          />
        )}
        {projectData.projectLink3 && (
          <PillLink
            url={projectData.projectLink3.url}
            label={projectData.projectLink3.title}
          />
        )}
      </div>
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
