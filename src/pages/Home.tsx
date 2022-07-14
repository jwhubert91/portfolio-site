import Button from "../components/Button"
import CenteredContent from "../components/CenteredContent"
import PageLayout from "../components/PageLayout"
import "./Home.css"

function Home() {
  return (
    <PageLayout className="flex flex-col Homepage" isNavBgTransparent={true}>
      <CenteredContent>
        <>
          <h2 className="text-snowWhite font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight">
            You don't need a website.
          </h2>
          <p className="mt-6 text-xl md:text-3xl text-slate-400 text-center max-w-lg md:max-w-2xl mx-auto">
            Share your past work, highlight projects, and display your contact
            info. All for free.
          </p>
          <Button
            buttonStyle="LARGE"
            className="mx-auto mt-10 xl:mt-12"
            onClick={() => console.log("hello!")}
          >
            Create a Portfolio
          </Button>
        </>
      </CenteredContent>
    </PageLayout>
  )
}

export default Home
