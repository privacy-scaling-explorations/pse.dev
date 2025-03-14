import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from '@/lib/types'

const content: ProjectContent = {
  en: {
    tldr: 'From Individual Actions to Collective Impact, Every Voice Makes a Difference',
    description:
      "VoiceDeck isn't just a platform; it's a movement. By enabling citizens to fund journalism that makes a real difference, we're crafting a narrative where every contribution paints a stroke on the canvas of our collective future. Join us to foster a legacy where journalism is powered by the very communities it serves.",
  },
}

export const voicedeck: ProjectInterface = {
  id: 'voice-deck',
  projectStatus: ProjectStatus.INACTIVE,
  category: ProjectCategory.APPLICATION,
  section: 'collaboration',
  content,
  image: 'voiceDeck.svg',
  name: 'VoiceDeck',
  links: {
    github: 'https://github.com/VoiceDeck',
    website: 'https://voicedeck.org/',
    twitter: 'https://twitter.com/VoiceDeckDAO',
  },
  tags: {
    keywords: ['Public goods'],
    themes: ['play'],
    types: ['Application'],
    builtWith: ['anonAadhaar', 'Hypercerts'],
  },
}
