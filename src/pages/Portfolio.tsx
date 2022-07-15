import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"

function Portfolio() {
  return (
    <PageLayout className="bg-culturedBlue">
      <div className="w-full md:max-w-3xl mx-auto p-2">
        <ProfileCard />
      </div>
    </PageLayout>
  )
}

export default Portfolio
