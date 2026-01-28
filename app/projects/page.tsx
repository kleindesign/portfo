"use client"
import ProjectCard from "@/components/project-card"
import { mainProjects } from "@/data/projects"

export default function ProjectsPage() {
  // const [showTagMenu, setShowTagMenu] = useState(false)

  // const toggleTagMenu = () => {
  //   setShowTagMenu(!showTagMenu)
  // }

  return (
    <div className="py-16">
      {/* Main Projects Grid */}
      <section className="project-grid">
        {mainProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>

      <div className="cat-footer-section">
        <img src="/images/catfooter5.gif" alt="Cats playing with yarn" className="cat-footer-image" />
      </div>
      {/* </CHANGE> */}
    </div>
  )
}
