import { Article } from "@/lib/blog"
import { cva } from "class-variance-authority"
import Image from "next/image"

const tagCardVariants = cva(
  "text-xs font-sans text-tuatara-950 rounded-[3px] py-[2px] px-[6px] w-fit",
  {
    variants: {
      variant: {
        primary: "bg-[#D8FEA8]",
        secondary: "bg-[#C2E8F5]",
      },
    },
  }
)

export const BlogArticleCard = ({
  id,
  image,
  title,
  date,
  authors,
}: Article) => {
  const imageUrl = `/articles/${id}/${image}`
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {image && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            quality={90}
          />
        )}
      </div>

      <div className="p-5 flex flex-col gap-5 lg:gap-8 min-h-[180px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Image
              src="/logos/pse-logo-bg.svg"
              alt="Privacy and Scaling Explorations"
              width={24}
              height={24}
            />
            <span className="text-black/50 font-medium text-sm">
              Privacy and Scaling Explorations
            </span>
          </div>
          <h2 className="text-2xl font-bold leading-7 text-black duration-200 cursor-pointer hover:text-anakiwa-500">
            {title}
          </h2>
        </div>

        <div className="flex justify-between mt-auto">
          {date && (
            <div className={tagCardVariants({ variant: "secondary" })}>
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}

          {authors && authors.length > 0 && (
            <p className="text-gray-500 text-sm mt-auto">
              By {authors.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
