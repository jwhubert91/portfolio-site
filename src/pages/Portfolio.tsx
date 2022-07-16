import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"
import ProjectCard from "../components/ProjectCard"

function Portfolio() {
  return (
    <PageLayout className="bg-culturedBlue">
      <div className="w-full sm:max-w-2xl mx-auto py-2 sm:px-2">
        <ProfileCard />
        <h3 className="mt-4 text-xl">Projects</h3>
        <ProjectCard />
      </div>
    </PageLayout>
  )
}

export default Portfolio
