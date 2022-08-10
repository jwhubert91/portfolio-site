import { ProjectType } from "../utilities/types"
import ProjectCard from "./ProjectCard"

interface ProjectListProps {
  projects: ProjectType[]
  isCurrentUserPortfolio?: boolean
}

function ProjectList({
  projects,
  isCurrentUserPortfolio = false,
}: ProjectListProps) {
  return (
    <div>
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.id}
            isCurrentUserProject={isCurrentUserPortfolio}
            projectData={project}
          />
        )
      })}
    </div>
  )
}

export default ProjectList
