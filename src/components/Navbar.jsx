import { ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Projets', href: '#projets' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#accueil" className="font-semibold tracking-tight">
          Arturo<span className="text-neutral-500"> Dergal</span>
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

        <div className="flex items-center gap-4">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm text-neutral-400 transition-colors hover:text-white sm:inline"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Travaillons ensemble
            <ArrowUpRight size={16} />
          </a>
        </div>
      </nav>
    </header>
  )
}
