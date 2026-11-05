import { ArrowDown } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', {
        yPercent: 110,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
      })
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
        stagger: 0.12,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="accueil"
      ref={root}
      className="flex min-h-screen flex-col justify-center px-6 pt-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight text-balance sm:text-7xl lg:text-8xl">
          {['Développeur &', 'créateur d’expériences', 'web mémorables.'].map(
            (line) => (
              <span key={line} className="block overflow-hidden">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ),
          )}
        </h1>

        <div
          data-hero-fade
          className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-neutral-400">
            Je conçois et développe des sites et interfaces rapides, soignés et
            animés avec attention au détail.
          </p>
          <a
            href="#projets"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm transition-colors hover:bg-white hover:text-neutral-950"
          >
            Voir mes projets
            <ArrowDown
              size={16}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
