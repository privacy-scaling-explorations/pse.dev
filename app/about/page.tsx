import React from "react"
import Image from "next/image"

import { Accordion } from "@/components/ui/accordion"

interface PrincipleContentProps {
  image: string
  children: React.ReactNode
  width?: number
  height?: number
}
const PrincipleContent = ({
  image,
  children,
  width = 300,
  height = 300,
}: PrincipleContentProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 py-4 md:mb-8 md:grid-cols-2 md:items-center md:gap-2 md:py-6">
      <div className="m-auto py-6 md:py-0">
        <Image
          width={width}
          height={height}
          src={image}
          alt="principle image"
        />
      </div>
      <span className="flex flex-col gap-4 break-words font-sans text-lg leading-7">
        {children}
      </span>
    </div>
  )
}
export default function AboutPage() {
  return (
    <div className="bg-anakiwa-200">
      <div className="bg-second-gradient">
        <div className="container mx-auto grid grid-cols-1 gap-16 py-10 lg:grid-cols-[1fr_300px] lg:gap-2 lg:py-20">
          <div className="flex flex-col gap-8 lg:w-4/5">
            <h6 className="break-words font-display text-4xl font-bold text-tuatara-950 md:py-4 md:text-5xl">
              Collective experimentation of cryptography.
            </h6>
            <span className="font-sans text-base font-normal leading-[27px] text-tuatara-950">
              PSE is a multi-disciplinary research and development lab supported
              by the Ethereum Foundation. We create open source infrastructure,
              tools and educational resources for building cryptography into
              real world applications.
            </span>
          </div>
          <div className="mx-auto">
            <Image
              width={300}
              height={300}
              src="/logos/pse-logo-bg.svg"
              alt="pse logo"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-8 py-16 md:px-32 md:py-24">
        <h6 className="font-display text-4xl uppercase">Pse principles</h6>
        <Accordion
          type="multiple"
          items={[
            {
              label: "01. Cryptography for people",
              value: "1",
              children: (
                <PrincipleContent
                  width={126}
                  height={114}
                  image="/logos/principle-1.svg"
                >
                  <p>
                    {`Cryptography is everywhere: every time you connect to a
                    secure site, log in with a password or unlock your phone,
                    you're seeing cryptography in action.`}
                  </p>
                  <p>
                    {`With “programmable” cryptography (like zero knowledge
                    proofs, multi-party computation or homomorphic encryption)
                    we can make verifiable claims about secret information
                    without revealing the information itself. This can be
                    applied to identity management, collusion resistance,
                    anonymous communication and so much more.`}
                  </p>
                  <p>
                    {`We're building a library of dev tools, research papers, and
                    prototypes that are open source and free for everyone to
                    use. We hope our resources inspire people to innovate the
                    technologies that their communities need.`}
                  </p>
                </PrincipleContent>
              ),
            },
            {
              label: "02. Privacy by default",
              value: "2",
              children: (
                <PrincipleContent
                  image="/logos/principle-2.svg"
                  width={176}
                  height={260}
                >
                  <p>
                    We believe that privacy is a fundamental right. We want to
                    be part of building an internet that divests from invasive
                    data practices, and instead gives people real choices about
                    who has access to their personal information. Permission
                    should be purpose specific, revocable, informed and
                    uncoerced.
                  </p>
                  <p>
                    We make tools that help people to securely authenticate
                    themselves, make confidential transactions on the
                    blockchain, and respect and preserve user privacy.
                  </p>
                </PrincipleContent>
              ),
            },
            {
              label: "03. Scaling for communities",
              value: "3",
              children: (
                <PrincipleContent
                  image="/logos/principle-3.svg"
                  width={236}
                  height={260}
                >
                  <p>
                    Zero knowledge proofs can verify computations quickly and
                    cheaply, helping decentralized systems like Ethereum become
                    more efficient. We research, design and share scaling
                    solutions that anyone can use to contribute to a stronger
                    and more practical digital public infrastructure.
                  </p>
                  <p>
                    We also grow our community by supporting the next generation
                    of builders. We host immersive summer programs for students
                    and regular live lectures that anyone in the world can join
                    and learn from.
                  </p>
                </PrincipleContent>
              ),
            },
            {
              label: "04. Open source public goods",
              value: "4",
              children: (
                <PrincipleContent
                  image="/logos/principle-4.svg"
                  width={238}
                  height={260}
                >
                  <p>
                    We are cultivating a diverse and multidisciplinary team to
                    explore the emerging zero knowledge ecosystem. PSE is made
                    up of programmers, engineers, and mathematicians working
                    alongside creatives and community organizers to
                    collaboratively discover the potential of programmable
                    cryptography.
                  </p>
                  <p>
                    We experiment in the open and welcome contributions,
                    integrations, forks, or feedback on all of our projects.
                  </p>
                </PrincipleContent>
              ),
            },
          ]}
        ></Accordion>
      </div>
    </div>
  )
}
