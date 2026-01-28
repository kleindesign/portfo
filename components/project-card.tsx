import Link from "next/link"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const IconComponent = project.icon

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-card block animate-drop-in group"
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      <div className="text-center">
        {/* SVG Icon - smaller size, bounces on hover */}
        <div className="project-icon w-20 h-20 mx-auto mb-6 transition-transform duration-300 ease-in-out group-hover:animate-bounce">
          <IconComponent className="w-full h-full text-black" />
        </div>

        {/* Text content wrapper for uniform scaling */}
        <div className="project-text-content">
          {/* Project Title */}
          <h3 className="text-xl font-bold mb-2 text-black">{project.title}</h3>

          {/* Project Tagline */}
          <p className="text-base font-light text-black leading-relaxed">{project.tagline}</p>
        </div>
      </div>
    </Link>
  )
}
