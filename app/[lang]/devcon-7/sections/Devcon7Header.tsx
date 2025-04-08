import Image from "next/image"

export const Devcon7Header = () => {
  return (
    <div className="relative h-[135px] lg:h-[135px]">
      <Image
        src="/images/devcon-7-mobile.svg"
        alt="Devcon 7 Banner"
        fill
        className="block object-cover md:hidden"
        priority
      />
      <Image
        src="/images/devcon-7-desktop.svg"
        alt="Devcon 7 Banner"
        fill
        className="hidden object-cover md:block"
        priority
      />
    </div>
  )
}
