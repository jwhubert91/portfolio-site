import PageLayout from "../components/PageLayout"
import { ExternalLinkType } from "../utilities/types"
import PillLink from "../components/PillLink"

const externalLinks = [
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

function ProjectDetail() {
  return (
    <PageLayout className="bg-culturedBlue">
      <div className="w-full sm:max-w-2xl mx-auto p-4 sm:px-2">
        <div>Profile image and creator full name</div>
        <h2 className="font-bold text-xl">Title</h2>
        <p className="text-base">Date Started - Date Finished or Current</p>
        <p className="text-black text-sm mb-2">Summary</p>
        <img
          src={
            "https://d1zdxptf8tk3f9.cloudfront.net/ckeditor_assets/pictures/2252/content_guilherme-vasconcelos-560064-unsplash.jpg"
          }
          alt="title"
          className="cover mb-2"
        />
        <p className="mb-4">Longer 2000 character description...</p>
        {externalLinks && (
          <div className="text-xs flex flex-wrap justify-center my-1">
            {externalLinks.map((link: ExternalLinkType, idx: number) => (
              <PillLink url={link.url} label={link.title} key={`link-${idx}`} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default ProjectDetail
