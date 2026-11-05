import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        // Entrée : le nom se lève derrière son masque, la photo apparaît
        gsap.from('[data-title-inner]', {
          yPercent: 115,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.15,
        })
        gsap.from('[data-hero-photo]', {
          opacity: 0,
          scale: 0.94,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.45,
        })
      }

      // Scroll : le nom reste collé en haut puis s'efface…
      gsap.to('[data-title]', {
        opacity: 0,
        yPercent: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      // …pendant que la photo glisse par-dessus (parallax)
      gsap.to('[data-hero-photo]', {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, root)

    // La hauteur du titre change une fois Switzer chargé
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])

  return (
    <section id="accueil" ref={root} className="relative min-h-screen">
      {/* Nom géant — fixe derrière tout, comme sur zendaya.com */}
      <div
        data-title
        className="pointer-events-none fixed -left-[8vw] -right-[8vw] top-[9vh] z-0 select-none overflow-hidden"
      >
        <h1
          data-title-inner
          className="whitespace-nowrap text-center text-[23vw] leading-[0.9] font-extrabold tracking-[-0.03em] text-white uppercase"
        >
          Arturo
        </h1>
      </div>

      {/* Contenu qui défile par-dessus le nom */}
      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pt-[13vh] pb-14 sm:pt-[26vh]">
        <img
          data-hero-photo
          src="/arturo.jpeg"
          alt="Arturo Dergal"
          width="200"
          height="200"
          className="w-[min(84vw,500px)] select-none"
        />
      </div>
    </section>
  )
}
