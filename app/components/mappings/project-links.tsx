import { Icons } from "../icons"

export const ProjectLinkIconMap: Record<string, any> = {
  github: (
    <Icons.gitHub size={18} className="duration-200 hover:text-anakiwa-500" />
  ),
  website: (
    <Icons.globe
      width={22}
      height={22}
      className="duration-200 hover:text-anakiwa-500"
    />
  ),
  twitter: (
    <Icons.twitter size={22} className="duration-200 hover:text-anakiwa-500" />
  ),
  telegram: (
    <Icons.telegram size={22} className="duration-200 hover:text-anakiwa-500" />
  ),
  discord: (
    <Icons.discord size={20} className="duration-200 hover:text-anakiwa-500" />
  ),
}
