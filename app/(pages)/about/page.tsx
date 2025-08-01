import { AppContent } from "@/components/ui/app-content"

import { Metadata } from "next"
import { HomepageBanner } from "@/components/sections/HomepageBanner"
import { Divider } from "@/components/divider"
import { AppLink } from "@/components/app-link"

export const metadata: Metadata = {
  title: "About",
  description: "About the Privacy Stewards of Ethereum community",
}

export default async function AboutPage() {
  const OurWorkItems = [
    {
      label: "Incubation",
      description:
        "We research and build open source public goods like protocols, primitives, and products.",
    },
    {
      label: "Education",
      description:
        "We create resources to help Ethereum devs and users make informed choices about privacy.",
    },
    {
      label: "Coordination",
      description:
        "We push for better privacy standards by aligning efforts across the ecosystem and guiding policy conversations.",
    },
  ]

  return (
    <Divider.Section>
      <div className="w-full bg-page-header-gradient dark:bg-transparent-gradient">
        <AppContent className="flex flex-col gap-16 py-16 w-full max-w-[978px] mx-auto">
          <div className="flex flex-col gap-10">
            <h2 className="font-sans text-base font-bold uppercase tracking-[4px] text-black dark:text-white text-center">
              Our Mission
            </h2>
            <span className="text-xl font-sans dark:text-tuatara-200 text-black lg:max-w-[730px] mx-auto">
              As Privacy Stewards of Ethereum (PSE), our mission is to deliver
              privacy to the{" "}
              <AppLink href="https://ethereum.org/en/" external>
                Ethereum ecosystem
              </AppLink>
              . We envision a future where privacy on Ethereum is the norm
              rather than the exception.
              <br /> <br />
              Building{" "}
              <AppLink
                href="https://www.activism.net/cypherpunk/manifesto.html"
                external
              >
                “an open society in the electronic age”
              </AppLink>{" "}
              {
                "requires privacy that is usable, scalable, and secure. We are a team of applied cryptographers, mathematicians, developers, designers, and coordinators working to embed programmable cryptography into Ethereum's application layer and make privacy accessible to individuals, developers, and institutions."
              }{" "}
              <br /> <br />
              Privacy is a cornerstone of freedom, safety, and is an{" "}
              <AppLink
                href="https://vitalik.eth.limo/general/2025/04/14/privacy.html"
                external
              >
                important guarantor for decentralization.
              </AppLink>{" "}
              {`We're building a future where digital infrastructure respects
              privacy by default, and permissions are purpose-specific,
              informed, uncoerced, and revocable.`}
              <br /> <br />
              {`Programmable cryptography unlocks transformative capabilities for
              digital commerce, identity, governance, and other systems of
              coordination. But the road to privacy isn't only technical. It
              requires shifts in user behavior, developer priorities, regulatory
              frameworks, and cultural norms. This is a collective challenge and
              we`}{" "}
              <AppLink href="https://discord.com/invite/sF5CT5rzrR" external>
                invite you
              </AppLink>{" "}
              to help us shape a more free digital future.
            </span>
          </div>

          <div className="flex flex-col gap-10">
            <h2 className="font-sans text-base font-bold uppercase tracking-[4px] text-black dark:text-white text-center">
              Our Work
            </h2>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 max-auto">
              {OurWorkItems?.map((item, index) => (
                <div className="flex flex-col gap-6 w-full lg:max-w-[300px]">
                  <article className="flex flex-col gap-2" key={index}>
                    <h6 className="font-sans text-xl font-medium text-black dark:text-white">
                      {item.label}
                    </h6>
                    <p className="font-sans text-base font-normal text-black dark:text-white">
                      {item.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <h2 className="font-sans text-base font-bold uppercase tracking-[4px] text-black dark:text-white text-center">
              Our History
            </h2>
            <span className="text-xl font-sans dark:text-tuatara-200 text-black lg:max-w-[730px] mx-auto">
              We began in 2018 as Applied ZKP, a team supported by the{" "}
              <AppLink href="https://ethereum.foundation/" external>
                Ethereum Foundation
              </AppLink>{" "}
              to push zero-knowledge proofs from theory to practice. In 2021, we
              became Privacy & Scaling Explorations (PSE), expanding our scope
              to programmable cryptography and tools across the stack. In 2025,
              we refined our mission as Privacy Stewards for Ethereum, shifting
              our focus toward concrete ecosystem impact.
            </span>
          </div>
        </AppContent>
      </div>
      <HomepageBanner />
    </Divider.Section>
  )
}
