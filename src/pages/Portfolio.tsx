import PageLayout from "../components/PageLayout"
import ProfileCard from "../components/ProfileCard"

function Portfolio() {
  return (
    <PageLayout>
      <div className="w-full md:max-w-2xl mx-auto p-2">
        <ProfileCard />
      </div>
    </PageLayout>
  )
}

export default Portfolio
