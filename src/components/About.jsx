import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * URL publiée de la scène (accroche natif, sans iframe).
 * Pour l'obtenir : ouvrir la scène dans Spline → Remix → Publish → copier l'URL.
 * Ex. https://prod.spline.design/XXXX/scene.splinecode
 *
 * Tant qu'elle est vide, la scène s'affiche en iframe de repli.
 */
const SPLINE_URL = ''

const SCENE_IFRAME =
  'https://app.spline.design/file/676da37a-9095-4b52-8a55-71ca4267571e?view=preview'

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
  const root = useRef(null)
  const [viewerReady, setViewerReady] = useState(false)

  // Le runtime Spline pèse ~1 Mo : on ne le charge que si une URL est publiée
  useEffect(() => {
    if (!SPLINE_URL) return
    let alive = true
    import('@splinetool/viewer')
      .then(() => alive && setViewerReady(true))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      if (reduceMotion) return

      // Texte : montée échelonnée
      gsap.from('[data-about-item]', {
        opacity: 0,
        y: 42,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 72%',
          once: true,
        },
      })

      // Scène 3D : le scroll la fait entrer de biais puis la pose en face,
      // collé 1:1 à la molette (aucune inertie à l'arrêt)
      gsap.fromTo(
        '[data-3d-card]',
        {
          transformPerspective: 1200,
          rotateY: 34,
          rotateX: -16,
          y: 120,
          scale: 0.86,
        },
        {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 88%',
            end: 'top 42%',
            scrub: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="apropos" ref={root} className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Colonne texte */}
        <div>
          <p
            data-about-item
            className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase"
          >
            À propos
          </p>

          <h2
            data-about-item
            className="mt-4 text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl"
          >
            Je construis des interfaces rapides, soignées et animées.
          </h2>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-400 sm:text-lg">
            <p data-about-item>
              Je suis Arturo Dergal, développeur web passionné par la création
              d'expériences fluides, rapides et agréables à utiliser. J'aime
              marier le soin du détail visuel à une exécution technique propre.
            </p>
            <p data-about-item>
              Mon approche : comprendre le besoin, prototyper vite, puis affiner
              jusqu'à ce que chaque interaction ait du sens.
            </p>
          </div>

          <ul data-about-item className="flex flex-wrap gap-3 pt-8">
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

        {/* Colonne 3D — accroche natif si URL publiée, iframe en repli */}
        <div data-3d-card className="relative will-change-transform">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {SPLINE_URL && viewerReady ? (
              <spline-viewer
                url={SPLINE_URL}
                loading="lazy"
                className="h-full w-full"
              />
            ) : (
              <iframe
                src={SCENE_IFRAME}
                title="iMac G4 — scène 3D par @bonumdesign"
                loading="lazy"
                allow="fullscreen"
                className="h-full w-full border-0"
              />
            )}
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            <a
              href="https://community.spline.design/file/5c9408a8-d134-4d40-8384-f08b72ce0a6d"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              iMac G4
            </a>{' '}
            par{' '}
            <a
              href="https://community.spline.design/@bonumdesign"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              @bonumdesign
            </a>{' '}
            — CC BY 4.0 · Made with Spline
          </p>
        </div>
      </div>
    </section>
  )
}
