import Card from "./Card"
import PortfulScreenshot from "../assets/images/portful-screenshot.webp"
import PillLink from "./PillLink"

function Project() {
  const myLinks = [
    {
      title: "Website",
      url: "https://jameshubert.com",
    },
    {
      title: "GitHub",
      url: "https://github.com/jwhubert91",
    },
    {
      title: "Blog Post",
      url: "https://dev.to/jwhubert91",
    },
  ]
  return (
    <Card className="my-2 px-8 py-4">
      <h3 className="font-bold text-lg">Portful.co</h3>
      <p className="text-slate-500 mb-2">June 2022 - July 2022</p>
      <div className="mb-2 p-4 h-108 border border-1 border-mutedGray rounded overflow-hidden">
        <img src={PortfulScreenshot} alt="portful" className="cover" />
      </div>
      <p className="text-sm">
        Portful.co is a React web application that allows anyone to create a
        portfolio and share it online. Built with React, Redux, Typescript,
        Tailwind, and Firebase.
      </p>
      <div className="text-xs flex flex-wrap justify-start my-1">
        {myLinks &&
          myLinks.map((link, idx) => (
            <PillLink url={link.url} label={link.title} key={`link-${idx}`} />
          ))}
      </div>
    </Card>
  )
}

export default Project
