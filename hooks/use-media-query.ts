import { useState, useEffect } from 'react'

function useMediaQuery(query:string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (event:any) => setMatches(event.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query, matches])

  return matches
}

export default useMediaQuery
