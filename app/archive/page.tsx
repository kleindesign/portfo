import ProjectCard from "@/components/project-card"
import { archivedProjects } from "@/data/projects"
import Link from "next/link"

export default function ArchivePage() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Archive</h1>
        <p className="text-lg font-light text-gray-600">“Additional project samples”</p>
      </div>

      {archivedProjects.length > 0 ? (
        <section className="project-grid">
          {archivedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <div className="text-center">
          <p className="text-lg font-light text-gray-500 mb-8">“Archive projects coming soon”</p>
          <Link href="/" className="more-projects-link text-lg font-light inline-flex items-center">
            ← “Back to Projects”
          </Link>
        </div>
      )}
    </div>
  )
}
