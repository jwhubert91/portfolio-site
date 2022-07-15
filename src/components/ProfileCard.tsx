import PillLink from "./PillLink"
import ProfileImage from "./ProfileImage"
import ShareButton from "./ShareButton"

const myLinks = [
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/jameswhubert",
  },
  {
    title: "Twitter",
    url: "https://twitter.com/jwhubert91",
  },
  {
    title: "GitHub",
    url: "https://github.com/jwhubert91",
  },
  {
    title: "Blog",
    url: "https://dev.to/jwhubert91",
  },
  {
    title: "Website",
    url: "https://jameshubert.com",
  },
]

function ProfileCard() {
  const backgroundImageSrc =
    "https://media.giphy.com/media/l0K47723zLLU11gac/giphy.gif"
  return (
    <div className="bg-white p-1 rounded">
      <div
        className="bg-xiketicBlack bg-cover h-36 md:h-52 flex items-end justify-center p-2"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      >
        <ProfileImage />
      </div>
      <div className="relative text-center px-2 py-4">
        <h2 className="text-2xl font-bold">James Hubert</h2>
        <p className="text-slate-600">@james</p>
        <p>Frontend Software Developer</p>
        <p className="mb-2">New York, NY</p>
        <p className="text-sm max-w-md mx-auto mb-4">
          I am a frontend-focused software developer based in New York City. My
          passions include startups, art, music, and non-profits.
        </p>
        <div className="text-sm flex flex-wrap justify-center">
          {myLinks &&
            myLinks.map((link, idx) => (
              <PillLink url={link.url} label={link.title} key={`link-${idx}`} />
            ))}
        </div>
        <ShareButton className="absolute rounded top-2 right-2" />
      </div>
    </div>
  )
}

export default ProfileCard
