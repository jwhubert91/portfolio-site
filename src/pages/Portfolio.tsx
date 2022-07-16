import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"
import Project from "../components/Project"

function Portfolio() {
  return (
    <PageLayout className="bg-culturedBlue">
      <div className="w-full md:max-w-3xl mx-auto p-2">
        <ProfileCard />
        <h3 className="mt-4 text-xl">Projects</h3>
        <Project />
      </div>
    </PageLayout>
  )
}

export default Portfolio
