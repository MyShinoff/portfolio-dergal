const skills = [
  'React',
  'Vite',
  'Tailwind CSS',
  'GSAP',
  'JavaScript',
  'Responsive design',
  'Accessibilité',
]

export default function About() {
  return (
    <section id="apropos" className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.5fr]">
        <h2 className="text-3xl font-medium tracking-tight sm:text-5xl">
          À propos
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-neutral-300">
          <p>
            Je suis Arturo Dergal, développeur web passionné par la création
            d'interfaces fluides, rapides et agréables à utiliser. J'aime
            marier le soin du détail visuel à une exécution technique propre.
          </p>
          <p className="text-neutral-400">
            Mon approche : comprendre le besoin, prototyper vite, puis affiner
            jusqu'à ce que chaque interaction ait du sens.
          </p>

          <ul className="flex flex-wrap gap-3 pt-4">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
