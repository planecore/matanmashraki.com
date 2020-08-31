import { useState, useEffect } from "react"

/** Returns the current width of the screen */
const useWindowWidth = (updateOnlyWhenGetsBigger: boolean = true) => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    const resizeListener = () => {
      // no need to update when updateOnlyWhenGetsBigger
      // is false and previous width is bigger
      if (updateOnlyWhenGetsBigger && windowWidth > window.innerWidth) return
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
  }, [windowWidth])

  return {
    windowWidth,
  }
}

export default useWindowWidth
