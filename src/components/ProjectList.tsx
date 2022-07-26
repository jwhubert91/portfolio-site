import Card from "./Card"

interface SimpleProjectProps {
  id: string
  title: string
}

interface ProjectListProps {
  projects: SimpleProjectProps[]
}

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div>
      {projects.map((project) => (
        <Card key={project.id} className="mb-4 p-2">
          <p>{project.title}</p>
        </Card>
      ))}
    </div>
  )
}

export default ProjectList
