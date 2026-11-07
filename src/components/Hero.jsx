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
        // Transition au chargement (sans scroll) : la photo se dévoile de haut
        // en bas puis se pose — le masque en bas dissout le bord du détourage
        gsap.fromTo(
          '[data-hero-photo]',
          { clipPath: 'inset(0% 0% 100% 0%)', y: -50, scale: 1.06 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
            delay: 0.45,
          },
        )
      }

      // Scroll : le texte est coupé petit à petit, collé 1:1 à la molette
      // (scrub: true = aucune inertie, aucun rebond à l'arrêt)
      gsap.fromTo(
        '[data-title]',
        { clipPath: 'inset(0% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      // La photo défile naturellement avec la page (pas de parallax :
      // c'était elle qui créait la sensation de résistance)
    }, root)

    // La hauteur du titre change une fois Switzer chargé
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])

  return (
    <section id="accueil" ref={root} className="relative min-h-screen overflow-hidden">
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
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <img
          data-hero-photo
          src="/arturo.png"
          alt="Arturo Dergal"
          width="200"
          height="200"
          className="w-[min(115vw,880px)] max-w-none select-none rounded-2xl"
          style={{
            // Le bas du détourage se dissout dans le fond : plus de coupure nette
            maskImage:
              'linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
