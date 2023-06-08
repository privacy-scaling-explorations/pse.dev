import NextImage from "next/image"
import Link from "next/link"
import PSELogo from "@/public/pselogo-footer.png"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="flex h-[350px] w-full justify-between bg-[#73D5C6] px-20">
      <div className="flex w-full items-center justify-start gap-5">
        <div className="flex h-[160px] w-[160px]">
          <NextImage src={PSELogo} width={160} height={160} alt="PSELOGO" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-black">
            Privacy and Scaling Exploration Team © 2023
          </h1>
          <h1 className="text-base text-black">
            A multidisciplinary team supported by the Ethereum Foundation.
          </h1>
          <div className="mt-10 flex h-full items-center gap-2 text-base font-bold text-black">
            <p>Legal</p>
            <div className="h-[20px] w-[1px] bg-black" />
            <p>Privacy</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 pt-20">
        <div className="flex h-full flex-col">
          {siteConfig.mainNav.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className={`link-without-last-border flex h-[56px] w-[148px] items-center justify-start border-x border-t border-black px-5 text-black transition-[2s] last:border-b hover:bg-[#46BBAC]`}
              >
                {item.title}
              </Link>
            )
          })}
        </div>
        <div className="flex h-full flex-col">
          {siteConfig.linksFooter.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                target="_blank"
                className={`link-without-last-border flex h-[56px] w-[148px] items-center justify-start border-x border-t border-black px-5 text-black transition-[2s] last:border-b hover:bg-[#46BBAC]`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
