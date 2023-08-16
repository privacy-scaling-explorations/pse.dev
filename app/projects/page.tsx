import { Metadata } from "next"

import ProjectFiltersBar from "@/components/project/project-filters-bar"
import ProjectList from "@/components/project/project-list"
import { ProjectResultBar } from "@/components/project/project-result-bar"

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "PSE is home to many projects, from cryptography research to developer tools, protocols and proof-of-concept applications.",
}

// TODO: MAKE IT RANDOM - This would prob need to be state and so metadata would get cut
//   // efficient fisher-yates shuffle
//   const array = [...projects]
//   let currentIndex = array.length,
//     randomIndex
//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex)
//     currentIndex--
//     ;[array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ]
//   }
//   return array
// }

export default function ProjectsPage() {
  return (
    <section>
      <div className="bg-anakiwa-200">
        <div className="container py-8 mx-auto md:py-12 lg:px-24 lg:py-16">
          <h1 className="text-4xl font-bold md:text-5xl">
            Explore the project library
          </h1>
          <p className="p-2"></p>
          <p className="w-full text-lg md:w-[612px] md:text-xl">
            PSE is home to many projects, from cryptography research to
            developer tools, protocols and proof-of-concept applications.
          </p>
          <ProjectFiltersBar />
        </div>
      </div>
      <div className="w-full bg-anakiwa-100">
        <div className="container">
          <div className="px-3 py-8">
            <ProjectResultBar />
          </div>
          <ProjectList />
        </div>
      </div>
    </section>
  )
}
