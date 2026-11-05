import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Projet Alpha',
    description: 'Site vitrine animé avec GSAP et React.',
    tags: ['React', 'GSAP', 'Tailwind'],
    year: '2026',
  },
  {
    title: 'Projet Beta',
    description: 'Tableau de bord interactif et responsive.',
    tags: ['React', 'Tailwind', 'Vite'],
    year: '2026',
  },
  {
    title: 'Projet Gamma',
    description: 'Landing page e-commerce performante.',
    tags: ['React', 'Tailwind'],
    year: '2025',
  },
]

export default function Projects() {
  return (
    <section id="projets" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-medium tracking-tight sm:text-5xl">
            Projets sélectionnés
          </h2>
          <span className="text-sm text-neutral-500">
            {projects.length} études de cas
          </span>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((project) => (
            <li key={project.title}>
              <a
                href="#"
                className="group flex flex-col gap-4 py-8 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-2xl font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-neutral-400">{project.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="text-sm text-neutral-500">
                    {project.year}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-neutral-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
