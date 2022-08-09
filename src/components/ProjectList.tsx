import { makePath } from "../utilities/helpers"
import { routes } from "../utilities/routes"
import ProjectCard from "./ProjectCard"

interface SimpleProjectProps {
  id: string
  title: string
}

interface ProjectListProps {
  projects: SimpleProjectProps[]
  isCurrentUserPortfolio?: boolean
}

function ProjectList({
  projects,
  isCurrentUserPortfolio = false,
}: ProjectListProps) {
  return (
    <div>
      {projects.map((project) => {
        // const path = makePath(routes.projects, routes.edit, project.id)
        return (
          // <Card key={project.id} className="mb-4">
          //   <Link to={path}>
          //     <div className="w-full p-2">
          //       <p>{project.title}</p>
          //     </div>
          //   </Link>
          // </Card>
          // TODO: Pass actual props to ProjectCard component :)
          <ProjectCard
            key={project.id}
            isCurrentUserProject={isCurrentUserPortfolio}
          />
        )
      })}
    </div>
  )
}

export default ProjectList
