import Link from "next/link"
import { mainProjects } from "@/data/projects"

interface ProjectNavigationProps {
  currentSlug: string
}

export default function ProjectNavigation({ currentSlug }: ProjectNavigationProps) {
  return (
    <div className="project-mini-nav flex justify-start items-center gap-2 mb-6 px-6">
      {mainProjects.map((project, index) => {
        const isActive = project.slug === currentSlug

        return (
          <Link key={project.id} href={`/projects/${project.slug}`} className={`mini-nav-icon block w-8 h-8 relative`}>
            <div className="mini-nav-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-sm bg-white text-black px-2 py-1 border border-gray-200 opacity-0 visibility-hidden transition-all duration-200 ease-in-out">
              {project.title}
            </div>
            <img
              src={`/icons/${
                project.slug === "stroll"
                  ? "stroll-icon"
                  : project.slug === "shelters-migrating-species"
                    ? "bus-icon"
                    : project.slug === "linkzorg"
                      ? "linkzorg-icon"
                      : project.slug === "evolveea"
                        ? "evolve-icon"
                        : project.slug === "triboro-ecodistrict"
                          ? "wind-turbine"
                          : "koet-icon"
              }.svg`}
              alt={project.title}
              className={`w-full h-full transition-colors duration-300 ease-in-out ${
                isActive ? "brightness-0 saturate-100" : "hover:brightness-0 hover:saturate-100"
              }`}
              style={{
                filter: isActive
                  ? "brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(315deg) brightness(100%) contrast(100%)"
                  : undefined,
              }}
            />
          </Link>
        )
      })}
    </div>
  )
}
