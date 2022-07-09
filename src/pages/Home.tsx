import Button from "../components/Button"
import Navbar from "../components/Navbar"
import "./Home.css"

function Home() {
  return (
    <div className="w-full flex-1 flex flex-col Homepage">
      <Navbar bgTransparent={true} />
      <main className="flex-1 flex flex-col items-center">
        <div className="mt-48 text-center">
          <h2 className="text-snowWhite font-extrabold text-5xl lg:text-8xl tracking-tight">
            You don't need a website.
          </h2>
          <p className="mt-6 text-3xl text-slate-400 text-center max-w-2xl mx-auto">
            Show your past work, highlight projects, and display your contact
            info. All for free.
          </p>
          <Button
            buttonStyle="LARGE"
            className="mt-10 mx-auto"
            onClick={() => console.log("hello!")}
          >
            Create a Portfolio
          </Button>
        </div>
      </main>
    </div>
  )
}

export default Home
