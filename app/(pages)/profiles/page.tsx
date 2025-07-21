import { members } from "@/content/members/directory"

export default function ProfilesPage() {
  return (
    <div className="flex flex-col gap-4 max-w-[800px] mx-auto p-10">
      {members.map((member) => {
        const avatar =
          member.contacts.github?.avatar ||
          member.contacts.twitter?.avatar ||
          member.contacts.telegram?.avatar ||
          member.contacts.email ||
          undefined
        return (
          <div className="flex items-center gap-2">
            <div
              className="h-10 w-10 rounded-full bg-gray-200"
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <span>{member.name}</span>
          </div>
        )
      })}
    </div>
  )
}
