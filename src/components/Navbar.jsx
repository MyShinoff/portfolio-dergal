import { ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Projets', href: '#projets' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-neutral-950/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#accueil" className="flex shrink-0 items-center">
          <img
            src="/Logo-Dergal.png"
            alt="Arturo Dergal"
            className="h-7 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="ml-auto hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Travaillons ensemble
          <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  )
}
