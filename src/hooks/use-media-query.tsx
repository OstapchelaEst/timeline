import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return

    const mediaQueryList = window.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener)
    } else {
      mediaQueryList.addListener(listener)
    }

    setMatches(mediaQueryList.matches)

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener)
      } else {
        mediaQueryList.removeListener(listener)
      }
    }
  }, [query])

  return matches
}
