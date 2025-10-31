import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const Fade = ({
  children,
  duration = 0.3,
  delayFadeIn = 0.7,
}: PropsWithChildren<{ delayFadeIn?: number; duration?: number }>) => {
  const [displayedChild, setDisplayedChild] =
    useState<React.ReactNode>(children)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (children === displayedChild) return

    const timeout = setTimeout(() => {
      setDisplayedChild(children)
    }, duration * 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [children])

  useGSAP(() => {
    if (children !== displayedChild) {
      gsap.to(ref.current, {
        opacity: 0,
        duration,
        height: ref.current?.offsetHeight,

        onComplete: () => {
          gsap.to(ref.current, {
            y: 10,
            delay: duration,
          })
        },
      })
    } else {
      if (ref.current)
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration,
          height: 'auto',
          delay: delayFadeIn - duration,
        })
    }
  }, [children, displayedChild])

  return <div ref={ref}>{displayedChild}</div>
}
