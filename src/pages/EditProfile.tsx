import PageLayout from "../components/PageLayout"
import CenteredContent from "../components/CenteredContent"
import FormHeader from "../components/FormHeader"

function EditProfile() {
  const handleSubmit = () => {
    console.log("Hello")
  }
  return (
    <PageLayout className="flex flex-col">
      <CenteredContent innerClassName="w-full sm:w-[540px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 py-8 shadow sm:rounded-md bg-white mb-4"
        >
          <FormHeader title="Edit Profile" />
          <p className="text-md italic">Introduce yourself to the community!</p>
        </form>
      </CenteredContent>
    </PageLayout>
  )
}

export default EditProfile
