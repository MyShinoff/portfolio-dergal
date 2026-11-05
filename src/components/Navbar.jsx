import { ArrowUpRight, Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const links = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Projets', href: '#projets' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
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
        y: 24,
        duration: 0.45,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.08,
      })
    })

    return () => ctx.revert()
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-neutral-950/90 backdrop-blur-md">
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

        {/* Liens desktop (gauche) */}
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

        {/* CTA desktop (droite) */}
        <a
          href="#contact"
          className="ml-auto hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Travaillons ensemble
          <ArrowUpRight size={16} />
        </a>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="ml-auto text-neutral-200 transition-colors hover:text-white md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div
          ref={panelRef}
          className="fixed inset-x-0 top-16 bottom-0 flex flex-col gap-2 bg-neutral-950 px-6 py-10 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  data-menu-link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-3xl font-medium tracking-tight text-neutral-100 transition-colors hover:text-neutral-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            data-menu-link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-neutral-950"
          >
            Travaillons ensemble
            <ArrowUpRight size={18} />
          </a>
        </div>
      )}
    </header>
  )
}
