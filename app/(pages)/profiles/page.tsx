import { members } from "@/content/members/directory"

export default function ProfilesPage() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-[800px] mx-auto p-10 w-full">
      {members.map((member) => {
        const avatar =
          member.contacts.github?.avatar ||
          member.contacts.twitter?.avatar ||
          member.contacts.telegram?.avatar ||
          member.contacts.email ||
          undefined
        return (
          <div className="grid grid-cols-[80px_1fr] items-center gap-4">
            <div
              className="h-20 w-20 rounded-full bg-gray-200 border border-gray-200"
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center centers",
              }}
            ></div>
            <div className="flex flex-col gap-1">
              <span>{member.name}</span>
              <small>{member.contacts.email}</small>
            </div>
          </div>
        )
      })}
    </div>
  )
}
