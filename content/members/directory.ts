interface MemberContacts {
  twitter?: {
    handle: string
    avatar: string
  }
  telegram?: {
    handle: string
    avatar: string | undefined
  }
  discord?: {
    handle: string
    avatar: string | undefined
  }
  github?: {
    handle: string
    avatar: string
  }
  email: string
  signal?: string
}

interface Member {
  name: string
  contacts: MemberContacts
}

export const members: Member[] = [
  {
    name: "Adria Bienvenido",
    contacts: {
      twitter: {
        handle: "@adria0",
        avatar: "https://unavatar.io/twitter/adria0",
      },
      github: {
        handle: "adria0",
        avatar: "https://github.com/adria0.png",
      },
      telegram: {
        handle: "@adriazero",
        avatar: undefined,
      },
      discord: {
        handle: "adria0#9858",
        avatar: undefined,
      },
      email: "adria0@pse.dev",
    },
  },
  {
    name: "Alessandro",
    contacts: {
      github: {
        handle: "ctrlc03",
        avatar: "https://github.com/ctrlc03.png",
      },
      discord: {
        handle: "ctrlc03#9544",
        avatar: undefined,
      },
      email: "ctrlc03@pse.dev",
    },
  },
  {
    name: "Alex Kuzmin",
    contacts: {
      twitter: {
        handle: "@alxkzmn",
        avatar: "https://unavatar.io/twitter/alxkzmn",
      },
      github: {
        handle: "alxkzmn",
        avatar: "https://github.com/alxkzmn.png",
      },
      telegram: {
        handle: "@snarkherder",
        avatar: undefined,
      },
      discord: {
        handle: "alexkuzmin",
        avatar: undefined,
      },
      email: "alex.kuzmin@pse.dev",
    },
  },
  {
    name: "Ali",
    contacts: {
      telegram: {
        handle: "@oxalizk",
        avatar: undefined,
      },
      discord: {
        handle: "0xalizk",
        avatar: undefined,
      },
      github: {
        handle: "0xalizk",
        avatar: "https://github.com/0xalizk.png",
      },
      email: "ali@pse.dev",
    },
  },
  {
    name: "Andrew Morris",
    contacts: {
      github: {
        handle: "voltrevo",
        avatar: "https://github.com/voltrevo.png",
      },
      discord: {
        handle: "voltrevo#6526",
        avatar: undefined,
      },
      email: "andrew.morris@pse.dev",
    },
  },
  {
    name: "Andy",
    contacts: {
      telegram: {
        handle: "@andyguzman506",
        avatar: undefined,
      },
      twitter: {
        handle: "@AndyGuzmanEth",
        avatar: "https://unavatar.io/twitter/AndyGuzmanEth",
      },
      discord: {
        handle: "aguzmant#1371",
        avatar: undefined,
      },
      github: {
        handle: "aguzmant103",
        avatar: "https://github.com/aguzmant103.png",
      },
      email: "andy@pse.dev",
    },
  },
  {
    name: "Anton Valov",
    contacts: {
      github: {
        handle: "0xmad",
        avatar: "https://github.com/0xmad.png",
      },
      discord: {
        handle: "errmac#5333",
        avatar: undefined,
      },
      email: "anton@pse.dev",
    },
  },
  {
    name: "Brechy",
    contacts: {
      telegram: {
        handle: "@brech1",
        avatar: undefined,
      },
      discord: {
        handle: "brechy",
        avatar: undefined,
      },
      github: {
        handle: "brech1",
        avatar: "https://github.com/brech1.png",
      },
      email: "aacero@pse.dev",
    },
  },
  {
    name: "Dan",
    contacts: {
      github: {
        handle: "dan_tlsn",
        avatar: "https://github.com/dan_tlsn.png",
      },
      discord: {
        handle: "dan_tlsn",
        avatar: undefined,
      },
      email: "dan@pse.dev",
    },
  },
  {
    name: "DoHoon Kim",
    contacts: {
      github: {
        handle: "DoHoonKim",
        avatar: "https://github.com/DoHoonKim.png",
      },
      discord: {
        handle: "DoHoonKim#0154",
        avatar: undefined,
      },
      email: "dohoon8@pse.dev",
    },
  },
  {
    name: "Edu",
    contacts: {
      telegram: {
        handle: "@Eduard0000",
        avatar: undefined,
      },
      github: {
        handle: "ed255",
        avatar: "https://github.com/ed255.png",
      },
      email: "edu@pse.dev",
    },
  },
  {
    name: "Enrico Bottazzi",
    contacts: {
      github: {
        handle: "enricobottazzi",
        avatar: "https://github.com/enricobottazzi.png",
      },
      discord: {
        handle: "enrico.eth#8998",
        avatar: undefined,
      },
      email: "enrico@pse.dev",
    },
  },
  {
    name: "Federico Landini",
    contacts: {
      telegram: {
        handle: "@fedeebasta1",
        avatar: undefined,
      },
      discord: {
        handle: "fedeebasta",
        avatar: undefined,
      },
      email: "fede@pse.dev",
    },
  },
  {
    name: "Guang-Yi",
    contacts: {
      telegram: {
        handle: "@yeeguangyi",
        avatar: undefined,
      },
      twitter: {
        handle: "@0xguangyi",
        avatar: "https://unavatar.io/twitter/0xguangyi",
      },
      discord: {
        handle: "thore hildebrandt#7399",
        avatar: undefined,
      },
      email: "guangyi@pse.dev",
    },
  },
  {
    name: "Guorong Du",
    contacts: {
      github: {
        handle: "duguorong009",
        avatar: "https://github.com/duguorong009.png",
      },
      discord: {
        handle: "duguorong009#5275",
        avatar: undefined,
      },
      email: "dgr009@pse.dev",
    },
  },
  {
    name: "Hendrik Eeckhaut",
    contacts: {
      telegram: {
        handle: "@heeckhau",
        avatar: undefined,
      },
      github: {
        handle: "heeckhau",
        avatar: "https://github.com/heeckhau.png",
      },
      discord: {
        handle: "Hendrik#6812",
        avatar: undefined,
      },
      email: "hendrik@pse.dev",
    },
  },
  {
    name: "John Guilding",
    contacts: {
      telegram: {
        handle: "@JohnGuilding",
        avatar: undefined,
      },
      github: {
        handle: "JohnGuilding",
        avatar: "https://github.com/JohnGuilding.png",
      },
      discord: {
        handle: "johnguilding",
        avatar: undefined,
      },
      email: "john@pse.dev",
    },
  },
  {
    name: "Kalidou Diagne",
    contacts: {
      telegram: {
        handle: "@kalidou_dev",
        avatar: undefined,
      },
      twitter: {
        handle: "@kld_diagne",
        avatar: "https://unavatar.io/twitter/kld_diagne",
      },
      discord: {
        handle: "kalidou.dev",
        avatar: undefined,
      },
      email: "kalidou@pse.dev",
    },
  },
  {
    name: "Keewoo",
    contacts: {
      telegram: {
        handle: "@keewoolee",
        avatar: undefined,
      },
      discord: {
        handle: "keewoolee",
        avatar: undefined,
      },
      email: "keewoole@gmail.com",
    },
  },
  {
    name: "Ki Chong",
    contacts: {
      telegram: {
        handle: "@kichong",
        avatar: undefined,
      },
      discord: {
        handle: "kichong",
        avatar: undefined,
      },
      email: "kichong@protonmail.com",
    },
  },
  {
    name: "Kimi Wu",
    contacts: {
      telegram: {
        handle: "@kimi_wu",
        avatar: undefined,
      },
      github: {
        handle: "KimiWu123",
        avatar: "https://github.com/KimiWu123.png",
      },
      discord: {
        handle: "kimi wu#2797",
        avatar: undefined,
      },
      email: "kimi@pse.dev",
    },
  },
  {
    name: "Mari",
    contacts: {
      telegram: {
        handle: "@maripoveda93",
        avatar: undefined,
      },
      discord: {
        handle: "maripoveda",
        avatar: undefined,
      },
      email: "mari@pse.dev",
    },
  },
  {
    name: "Marios",
    contacts: {
      telegram: {
        handle: "@mari0sAr",
        avatar: undefined,
      },
      discord: {
        handle: "m_aronis#7493",
        avatar: undefined,
      },
      email: "marios@pse.dev",
    },
  },
  {
    name: "Miha",
    contacts: {
      github: {
        handle: "miha-stopar",
        avatar: "https://github.com/miha-stopar.png",
      },
      email: "miha.stopar@pse.dev",
    },
  },
  {
    name: "Mitsuhiro Matsumoto",
    contacts: {
      github: {
        handle: "Mitsu",
        avatar: "https://github.com/Mitsu.png",
      },
      discord: {
        handle: "Mitsu#4993",
        avatar: undefined,
      },
      email: "mitsu@pse.dev",
    },
  },
  {
    name: "Moven Tsai",
    contacts: {
      twitter: {
        handle: "@moven0831",
        avatar: "https://unavatar.io/twitter/moven0831",
      },
      telegram: {
        handle: "@moven0831",
        avatar: undefined,
      },
      email: "moventsai@pse.dev",
    },
  },
  {
    name: "Nam Ngo",
    contacts: {
      twitter: {
        handle: "@_nam_nc",
        avatar: "https://unavatar.io/twitter/_nam_nc",
      },
      telegram: {
        handle: "@namncc",
        avatar: undefined,
      },
      discord: {
        handle: "_nam_nc",
        avatar: undefined,
      },
      github: {
        handle: "namnc",
        avatar: "https://github.com/namnc.png",
      },
      email: "namncc@pse.dev",
    },
  },
  {
    name: "Nick Tampakas",
    contacts: {
      telegram: {
        handle: "@nick_zst",
        avatar: undefined,
      },
      discord: {
        handle: "ntampakas#0247",
        avatar: undefined,
      },
      email: "nick@pse.dev",
    },
  },
  {
    name: "Nico Serrano",
    contacts: {
      github: {
        handle: "nicoserranop",
        avatar: "https://github.com/nicoserranop.png",
      },
      email: "nicoserranop@pse.dev",
    },
  },
  {
    name: "Nicole Yeh",
    contacts: {
      telegram: {
        handle: "@NicoleYeh",
        avatar: undefined,
      },
      discord: {
        handle: "nicoleyeh",
        avatar: undefined,
      },
      email: "nicole.yeh@pse.dev",
    },
  },
  {
    name: "Paradox",
    contacts: {
      telegram: {
        handle: "@Bisht13",
        avatar: undefined,
      },
      discord: {
        handle: "paradox_13",
        avatar: undefined,
      },
      github: {
        handle: "Bisht13",
        avatar: "https://github.com/Bisht13.png",
      },
      email: "paradox@pse.dev",
    },
  },
  {
    name: "Pierre Daix-Moreux",
    contacts: {
      telegram: {
        handle: "@dmpierre",
        avatar: undefined,
      },
      github: {
        handle: "dmpierre",
        avatar: "https://github.com/dmpierre.png",
      },
      email: "pierre@pse.dev",
    },
  },
  {
    name: "Rasul",
    contacts: {
      twitter: {
        handle: "@curryrasul",
        avatar: "https://unavatar.io/twitter/curryrasul",
      },
      telegram: {
        handle: "@curryrasul",
        avatar: undefined,
      },
      discord: {
        handle: "curryrasul#9917",
        avatar: undefined,
      },
      github: {
        handle: "curryrasul",
        avatar: "https://github.com/curryrasul.png",
      },
      email: "curryrasul@pse.dev",
    },
  },
  {
    name: "Sam Richards",
    contacts: {
      twitter: {
        handle: "@samonchain",
        avatar: "https://unavatar.io/twitter/samonchain",
      },
      telegram: {
        handle: "@samajammin",
        avatar: undefined,
      },
      discord: {
        handle: "@samajammin",
        avatar: undefined,
      },
      github: {
        handle: "samajammin",
        avatar: "https://github.com/samajammin.png",
      },
      signal: "@sbr.78",
      email: "sam@pse.dev",
    },
  },
  {
    name: "Sinu",
    contacts: {
      twitter: {
        handle: "@sinu_eth",
        avatar: "https://unavatar.io/twitter/sinu_eth",
      },
      discord: {
        handle: "sinu.eth#6957",
        avatar: undefined,
      },
      github: {
        handle: "sinui0",
        avatar: "https://github.com/sinui0.png",
      },
      email: "sinu@pse.dev",
    },
  },
  {
    name: "Sora Suegami",
    contacts: {
      telegram: {
        handle: "@sorasue",
        avatar: undefined,
      },
      discord: {
        handle: "sorasue",
        avatar: undefined,
      },
      github: {
        handle: "SoraSuegami",
        avatar: "https://github.com/SoraSuegami.png",
      },
      email: "sorasuegami@pse.dev",
    },
  },
  {
    name: "Takamichi",
    contacts: {
      telegram: {
        handle: "@tkmct",
        avatar: undefined,
      },
      discord: {
        handle: "tkmct#3101",
        avatar: undefined,
      },
      github: {
        handle: "tkmct",
        avatar: "https://github.com/tkmct.png",
      },
      email: "tkmct@pse.dev",
    },
  },
  {
    name: "Tanner",
    contacts: {
      telegram: {
        handle: "@codetrauma",
        avatar: undefined,
      },
      discord: {
        handle: "traumaaa",
        avatar: undefined,
      },
      email: "tanner@pse.dev",
    },
  },
  {
    name: "Thomas",
    contacts: {
      twitter: {
        handle: "@th4s_",
        avatar: "https://unavatar.io/twitter/th4s_",
      },
      telegram: {
        handle: "@th4s7",
        avatar: undefined,
      },
      discord: {
        handle: "th4s_",
        avatar: undefined,
      },
      github: {
        handle: "th4s",
        avatar: "https://github.com/th4s.png",
      },
      email: "thomas@pse.dev",
    },
  },
  {
    name: "Tsukino",
    contacts: {
      github: {
        handle: "0xtsukino",
        avatar: "https://github.com/0xtsukino.png",
      },
      discord: {
        handle: "tsukino#0518",
        avatar: undefined,
      },
      email: "tsukino@pse.dev",
    },
  },
  {
    name: "Vikas Rushi",
    contacts: {
      telegram: {
        handle: "@vikasrushi",
        avatar: undefined,
      },
      discord: {
        handle: "vikasrushi",
        avatar: undefined,
      },
      github: {
        handle: "vikasrushi",
        avatar: "https://github.com/vikasrushi.png",
      },
      email: "vikas@pse.dev",
    },
  },
  {
    name: "Vivian Plasencia",
    contacts: {
      telegram: {
        handle: "@vivianpc",
        avatar: undefined,
      },
      discord: {
        handle: "vivianplasencia",
        avatar: undefined,
      },
      github: {
        handle: "vplasencia",
        avatar: "https://github.com/vplasencia.png",
      },
      email: "vivianpc@pse.dev",
    },
  },
  {
    name: "Winderica",
    contacts: {
      telegram: {
        handle: "@winderica",
        avatar: undefined,
      },
      discord: {
        handle: "w1nd3r1c4",
        avatar: undefined,
      },
      github: {
        handle: "winderica",
        avatar: "https://github.com/winderica.png",
      },
      email: "winderica@pse.dev",
    },
  },
  {
    name: "Yanis Meziane",
    contacts: {
      telegram: {
        handle: "@meyanisxyz",
        avatar: undefined,
      },
      twitter: {
        handle: "@yanis_mezn",
        avatar: "https://unavatar.io/twitter/yanis_mezn",
      },
      discord: {
        handle: "sinaxyz#3158",
        avatar: undefined,
      },
      email: "yanis@pse.dev",
    },
  },
  {
    name: "Yuro Itaki",
    contacts: {
      twitter: {
        handle: "@yuroitaki",
        avatar: "https://unavatar.io/twitter/yuroitaki",
      },
      telegram: {
        handle: "@yuroitaki",
        avatar: undefined,
      },
      discord: {
        handle: "yuroitaki",
        avatar: undefined,
      },
      github: {
        handle: "yuroitaki",
        avatar: "https://github.com/yuroitaki.png",
      },
      email: "chris.chong@pse.dev",
    },
  },
  {
    name: "Zoey",
    contacts: {
      telegram: {
        handle: "@xZoey",
        avatar: undefined,
      },
      twitter: {
        handle: "@0xZoey",
        avatar: "https://unavatar.io/twitter/0xZoey",
      },
      discord: {
        handle: "0x_zoey",
        avatar: undefined,
      },
      email: "zoey@pse.dev",
    },
  },
]
