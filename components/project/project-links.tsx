import { RiTelegramLine as TelegramIcon } from "react-icons/ri"

import { Icons } from "../icons"

export const ProjectLinkIconMap: Record<string, any> = {
  github: <Icons.gitHub size={16} />,
  website: <Icons.globe />,
  twitter: <Icons.twitter size={18} />,
  telegram: <TelegramIcon size={16} />,
  discord: <Icons.discord size={16} />,
}
