import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Séquence d'images de la scène « iMac G4 » : le rendu réel de la scène,
 * détouré (fond transparent) pour flotter directement dans le fond du site.
 * 24 frames = un tour complet de 360°, pilotées par le scroll.
 */
const FRAMES = 24
const frameSrc = (i) => `/frames/imac-${String(i).padStart(2, '0')}.webp`

/**
 * Option : accroche natif interactif (sans iframe) si une scène est publiée.
 * Spline → Remix → Export → Viewer → coller l'URL ici.
 * Ex. https://prod.spline.design/XXXX/scene.splinecode
 */
const SPLINE_URL = ''

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
  const frameRef = useRef(null)
  const [viewerReady, setViewerReady] = useState(false)

  // Option accroche natif : runtime chargé uniquement si une URL existe
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

  // Préchargement des frames (352 Ko au total)
  useEffect(() => {
    if (SPLINE_URL) return
    for (let i = 0; i < FRAMES; i++) {
      const img = new Image()
      img.src = frameSrc(i)
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

      // La carte entre de biais puis se pose en face : collé 1:1 au scroll
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

      // L'iMac tourne sur lui-même pendant que la carte se pose
      if (!SPLINE_URL) {
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 88%',
          end: 'top 42%',
          onUpdate: (self) => {
            const img = frameRef.current
            if (!img) return
            const i = Math.min(
              FRAMES - 1,
              Math.round(self.progress * (FRAMES - 1)),
            )
            if (img.dataset.i !== String(i)) {
              img.dataset.i = String(i)
              img.src = frameSrc(i)
            }
          },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="apropos"
      ref={root}
      className="relative z-10 px-6 pt-30 pb-24 sm:pt-36 sm:pb-32"
      style={{
        // Bord supérieur qui se dissout : la section recouvre le hero sans
        // jamais faire apparaître une coupure nette du PNG
        backgroundImage:
          'linear-gradient(to bottom, transparent 0px, var(--color-neutral-950) 100px)',
      }}
    >
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

        {/* Colonne 3D — l'iMac flotte dans le fond du site, sans cadre */}
        <div data-3d-card className="relative will-change-transform">
          {SPLINE_URL && viewerReady ? (
            <div className="aspect-[4/3] w-full overflow-hidden">
              <spline-viewer
                url={SPLINE_URL}
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          ) : (
            <img
              ref={frameRef}
              data-i="0"
              src={frameSrc(0)}
              alt="iMac G4 — scène 3D de @bonumdesign, tournée au scroll"
              draggable={false}
              loading="lazy"
              className="w-full select-none"
            />
          )}

          <p className="mt-4 text-xs text-neutral-500">
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
