"use client"

import NextImage from "next/image"
import { usePathname } from "next/navigation"
import GithubVector from "@/public/githubblack-vector.png"
import GlobalVector from "@/public/globeblack-vector.png"
import SkyNoMoonBg from "@/public/skynomoon.png"
import TwitterVector from "@/public/twitterblack-vector.png"

import { projects } from "@/config/projects"
import Breadcrumbs from "@/components/breadcrumbs"

export default function ProjectDetailPage() {
  const router = usePathname()

  const breadcrumbs = router
    .split("/")
    .slice(1)
    .map((part) => {
      const id = Number(part)

      if (!isNaN(id)) {
        const project = projects.find((project) => project.id === id)

        return project ? project.name : part
      } else {
        return part
      }
    })

  return (
    <section className="flex flex-col items-center">
      <div className="relative flex h-auto w-full justify-center overflow-hidden md:h-[400px]">
        <div className="absolute inset-0 z-[10] flex">
          <div className="aspect-w-2 aspect-h-1">
            <NextImage
              src={SkyNoMoonBg}
              alt="bg"
              style={{ objectFit: "cover" }}
              fill={true}
            />
          </div>
        </div>
        <div className="z-[11] flex w-full flex-col justify-center gap-5 p-[24px] md:w-[664px] md:p-0">
          <Breadcrumbs path={breadcrumbs} />
          <h1 className="text-2xl font-[700] md:text-3xl">
            RLN or longer project name goes here
          </h1>
          <div className="flex flex-wrap items-center justify-start gap-5">
            <div className="flex items-center gap-2">
              <NextImage src={GithubVector} alt="bg" width={20} height={20} />
              <h1>Github</h1>
            </div>{" "}
            <div className="flex items-center gap-2">
              <NextImage src={GlobalVector} alt="bg" width={20} height={20} />
              <h1>Website</h1>
            </div>{" "}
            <div className="flex items-center gap-2">
              <NextImage src={TwitterVector} alt="bg" width={20} height={20} />
              <h1>Twitter</h1>
            </div>
          </div>
          <p className="mt-5 w-full text-lg md:w-[612px]">
            Lorem ipsum dolor sit amet consectetur. Gravida nibh amet amet
            tristique. Ornare adipiscing sed semper sed egestas eget sed non
            faucibus.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-anakiwa px-[24px] py-10 md:px-0">
        <div className="flex h-[464px] w-full items-center justify-center border border-black py-10 md:w-[664px]">
          <h1>Image Ratio</h1>
        </div>
        <div className="flex w-full flex-col gap-5 py-10 text-base md:w-[664px] md:text-lg">
          <h1>
            {`RLN is a protocol that allows one user to punish another user who is
            abusing the rate limit in an anonymous system. Users can withdraw
            the offender's stake or reveal their secrets, helping to maintain
            system integrity via deterrence. RLN is built using the Semaphore
            protocol.`}
          </h1>
          <h1>
            {`This project is aimed at developers looking to stop spam while
            preserving anonymity within a system. If you're working on
            communication systems such as chat apps, client-server
            communications, or peer-to-peer communications, RLN can help you
            maintain privacy and anonymity while preventing abuse in the form of
            spam and denial of service attacks. This ensures a safer and more
            enjoyable user experience for your application's users.`}
          </h1>
        </div>
      </div>
    </section>
  )
}
