import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Desire chapter: pinned title + scrubbing scale image (gpt-taste) */
export default function DesirePin() {
  const wrap = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !wrap.current) return
    const ctx = gsap.context(() => {
      const img = wrap.current.querySelector('.desire-img')
      gsap.fromTo(
        img,
        { scale: 0.82, opacity: 0.35 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: true,
          },
        }
      )
    }, wrap)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section ref={wrap} className="relative min-h-[100dvh] overflow-hidden bg-night-950" aria-label="Recovery imagery">
      <div className="mx-auto grid min-h-[100dvh] max-w-shell items-center gap-10 px-4 py-20 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
            See the night clearly
          </h2>
          <p className="mt-5 max-w-[36ch] text-white/60 text-pretty">
            Scores without mystery. Every risk factor explained so you can act tonight.
          </p>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10 lg:col-span-8">
          <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
            <img
              className="desire-img h-[50vh] w-full object-cover will-change-transform lg:h-[70vh]"
              src="/brand/sleep-oracle-hero-night.png"
              alt="Calm night interior used as recovery atmosphere"
              width={1600}
              height={900}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
