import { useNavigate, Link } from "react-router-dom"
import Card from "./Card"
import PillLink from "./PillLink"
import { getMonthStringFromInteger, makePath } from "../utilities/helpers"
import { ProjectType } from "../utilities/types"
import CardAdminButton from "./CardAdminButton"
import { MdModeEdit } from "react-icons/md"
import { routes } from "../utilities/routes"

const projectData: ProjectType = {
  id: "1",
  creatorId: "1",
  title: "Portful.co",
  startMonth: 6,
  startYear: 2022,
  endMonth: null,
  endYear: null,
  inProgress: true,
  summary256: `Portful.co is a React web application that allows anyone to create a
  portfolio and share it online. Built with React, Redux, Typescript,
  Tailwind, and Firebase.`,
  image:
    "https://d1zdxptf8tk3f9.cloudfront.net/ckeditor_assets/pictures/2252/content_guilherme-vasconcelos-560064-unsplash.jpg",
  projectLink1: {
    title: "Website",
    url: "https://jameshubert.com",
  },
  projectLink2: {
    title: "GitHub",
    url: "https://github.com/jwhubert91",
  },
  projectLink3: {
    title: "Blog Post",
    url: "https://dev.to/jwhubert91",
  },
}

interface ProjectCardProps {
  isCurrentUserProject?: boolean
}

function ProjectCard({ isCurrentUserProject = false }: ProjectCardProps) {
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
        {projectData.image && (
          <div className="mb-2 p-4 h-108 border border-1 border-mutedGray rounded overflow-hidden">
            <img
              src={projectData.image}
              alt={projectData.title}
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
