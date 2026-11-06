import { ArrowUpRight, Code2, Mail, MapPin, Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const links = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Projets', href: '#projets' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com', icon: Code2 },
  { label: 'Email', href: 'mailto:contact@example.com', icon: Mail },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  // Fermeture avec Échap
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Bloque le scroll derrière le menu ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Animation d'ouverture / fermeture
  useLayoutEffect(() => {
    if (!open || !panelRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
      )
      gsap.from('[data-menu-link]', {
        opacity: 0,
        y: 32,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.08,
      })
      gsap.from('[data-menu-meta]', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.35,
      })
    })

    return () => ctx.revert()
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-neutral-950">
        <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo centré */}
        <a
          href="#accueil"
          onClick={() => setOpen(false)}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
        >
          <img
            src="/Logo-Dergal.png"
            alt="Arturo Dergal"
            className="h-7 w-auto"
          />
        </a>

        {/* Hamburger (mobile + desktop) */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="ml-auto flex items-center gap-2 text-sm text-neutral-200 transition-colors hover:text-white"
        >
          <span className="hidden sm:inline">
            {open ? 'Fermer' : 'Menu'}
          </span>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        </nav>
      </header>

      {/* Menu plein écran — hors du header : backdrop-blur créerait une
          boîte de contenu qui annule la hauteur d'un élément fixed */}
      {open && (
        <div
          ref={panelRef}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-neutral-950"
        >
          <div className="mx-auto flex min-h-full max-w-6xl flex-col gap-12 px-6 py-12 md:flex-row md:items-center md:justify-between md:gap-20 md:py-16">
            {/* Liens */}
            <ul className="flex flex-col gap-4 md:gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    data-menu-link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl font-medium tracking-tight text-neutral-100 transition-colors hover:text-neutral-400 sm:text-6xl"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Colonne infos (desktop) */}
            <div
              data-menu-meta
              className="flex flex-col gap-8 text-sm text-neutral-400 md:items-end md:text-right"
            >
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-500" />
                  Disponible à distance
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-neutral-500" />
                  contact@example.com
                </li>
              </ul>

              <ul className="flex items-center gap-5">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 transition-colors hover:text-white"
                    >
                      <Icon size={16} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                data-menu-link
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-neutral-950 transition-transform hover:-translate-y-0.5"
              >
                Travaillons ensemble
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
