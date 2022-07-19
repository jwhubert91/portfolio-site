import Card from "./Card"
import PortfulScreenshot from "../assets/images/portful-screenshot.webp"
import PillLink from "./PillLink"

function ProjectCard() {
  const projectData = {
    title: "Portful.co",
    startMonth: 6,
    startYear: 2022,
    endMonth: null,
    endYear: null,
    inProgress: true,
    summary256: `Portful.co is a React web application that allows anyone to create a
    portfolio and share it online. Built with React, Redux, Typescript,
    Tailwind, and Firebase.`,
    image: PortfulScreenshot,
    externalLinks: [
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
    ],
  }
  return (
    <Card className="my-2 px-8 py-4">
      <h3 className="font-bold text-lg">{projectData.title}</h3>
      <p className="text-slate-500">June 2022 - Present</p>
      <p className="text-xs sm:text-sm my-2">{projectData.summary256}</p>
      {projectData.image && (
        <div className="mb-2 p-4 h-108 border border-1 border-mutedGray rounded overflow-hidden">
          <img
            src={projectData.image}
            alt={projectData.title}
            className="cover"
          />
        </div>
      )}
      <div className="text-xs flex flex-wrap justify-center my-1">
        {projectData.externalLinks &&
          projectData.externalLinks.map((link, idx) => (
            <PillLink url={link.url} label={link.title} key={`link-${idx}`} />
          ))}
      </div>
    </Card>
  )
}

export default ProjectCard
