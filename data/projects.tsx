import type React from "react"

export interface Project {
  id: number
  title: string
  tagline: string
  slug: string
  icon: React.ComponentType<{ className?: string }>
  isArchived?: boolean
}

// Custom SVG Icons - now importing from the icons folder
export const StrollIcon = ({ className = "" }: { className?: string }) => (
  <img src="/icons/stroll-icon.svg" alt="Stroll" className={className} />
)

export const SheltersIcon = ({ className = "" }: { className?: string }) => (
  <img src="/icons/bus-icon.svg" alt="Shelters" className={className} />
)

export const LinkZorgIcon = ({ className = "" }: { className?: string }) => (
  <img src="/icons/linkzorg-icon.svg" alt="LinkZorg" className={className} />
)

export const EvolveEAIcon = ({ className = "" }: { className?: string }) => (
  <img src="/icons/evolve-icon.svg" alt="EvolveEA" className={className} />
)

export const TriboroIcon = ({ className = "" }: { className?: string }) => (
  <img src="/icons/wind-turbine.svg" alt="Triboro Ecodistrict" className={className} />
)

export const KoetMeerIcon = ({ className = "" }: { className?: string }) => (
  <img src="/icons/koet-icon.svg" alt="KoetMeer" className={className} />
)

  export const mainProjects: Project[] = [
  {
    id: 1,
    title: "LinkZorg",
    tagline: "connecting vulnerable patients to local support",
    slug: "linkzorg",
    icon: LinkZorgIcon,
  },
  {
    id: 2,
    title: "Building Performance Dashboard",
    tagline: "visualizing climate impact, building by building",
    slug: "evolveea",
    icon: EvolveEAIcon,
  },
  {
    id: 3,
    title: "Shelters for Migrating Species",
    tagline: "transit infrastructure that connects community, nature, and place",
    slug: "shelters-migrating-species",
    icon: SheltersIcon,
  },
  {
    id: 4,
    title: "Stroll: Calm Tech Wearable",
    tagline: "screen-free urban navigation",
    slug: "stroll",
    icon: StrollIcon,
  },
  {
    id: 5,
    title: "KoetMeer",
    tagline: "growing and celebrating biodiversity in Amsterdam’s canals",
    slug: "koetmeer",
    icon: KoetMeerIcon,
  },
]

export const archivedProjects: Project[] = [
  // We'll add archived projects later
]
