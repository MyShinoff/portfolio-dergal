import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-14">
        <p className="text-sm text-neutral-400">Contact</p>

        <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          Un projet en tête ? Écrivons-nous.
        </h2>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:contact@example.com"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-neutral-950 transition-transform hover:-translate-y-0.5"
          >
            contact@example.com
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>

          <ul className="space-y-2 text-sm text-neutral-400">
            <li className="flex items-center gap-2">
              <Mail size={16} /> Basé partout, disponible à distance
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Réponse sous 24 h
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
