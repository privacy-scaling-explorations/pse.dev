import NextLink from "next/link"

interface Props {
  path: string[]
}

const Breadcrumbs = ({ path }: Props) => {
  return (
    <div className="flex text-[#4A5754]">
      {path.map((item, index) => {
        const isLastItem = index === path.length - 1
        if (isLastItem) {
          return (
            <p key={index} className="cursor-pointer font-bold capitalize">
              {item}
            </p>
          )
        }
        return (
          <NextLink key={index} href={`/${item}`} className={"capitalize"}>
            {item === "projects" ? "All Projects" : item}
            <span className="mx-2">/</span>
          </NextLink>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
