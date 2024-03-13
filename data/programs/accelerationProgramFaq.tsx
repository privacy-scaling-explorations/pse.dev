import { Faq } from "@/lib/types"

export const accelerationProgramFaq: Faq[] = [
  {
    question: "Who can apply?",
    answer:
      "The program is open to alumni of our entry level programs (e.g. Contributions Program, ZK Playground) and other applicants at beginner to intermediate levels with programmable cryptography.",
  },
  {
    question: "What platform does the program use?",
    answer:
      "We will primarily utilize a Github repository for managing documents and staging of the grant proposals, grantees, and their progress. Stakeholders involved can utilize Github issues and pull requests to comment and collaborate.",
  },
  {
    question: "How does the grant funding work?",
    answer: (
      <>
        <span>
          While the core funding this program comes through PSE via the Ethereum
          Ecosystem Support Program (ESP), some bounties are supported by
          specific teams.
        </span>
        <span>
          Selected grantees will receive a small amount of funding after the
          completion of the first milestone. Following milestones will be
          awarded larger amounts.
        </span>
      </>
    ),
  },
  {
    question: "How many proposals are accepted per open task?",
    answer:
      "Generally one proposal will be accepted. However, it is possible for applicants to form a team and work collaboratively.",
  },
  {
    question: "How long will I have to tackle the open tasks?",
    answer:
      "Though our rounds are run in three month periods, grants may last longer depending on task details.",
  },
  {
    question: "Can I propose an open task?",
    answer:
      "If you have an interesting idea, you can submit it as an self proposed open task. Just to make sure you clearly credit to the original idea and clearly state if that idea is also funded by someone else.",
  },
  {
    question: "What if I have more questions?",
    answer:
      "For any further questions or additional information, you can join our Telegram group!",
  },
]
