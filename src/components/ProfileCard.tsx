import ProfileImage from "./ProfileImage"

function ProfileCard() {
  return (
    <div className="bg-white">
      <div className="h-36 md:h-42">
        <img
          src={"https://media.giphy.com/media/l0K47723zLLU11gac/giphy.gif"}
          className="object-cover h-36 md:h-42 w-full"
        />
        <ProfileImage />
      </div>
    </div>
  )
}

export default ProfileCard
