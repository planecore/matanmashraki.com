import { useState, useEffect } from "react"

const useScreenWidth = (updateOnlyWhenGetsBigger: boolean = true) => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    const resizeListener = () => {
      if (updateOnlyWhenGetsBigger && screenWidth > window.innerWidth) return
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
  }, [screenWidth])

  return {
    screenWidth,
  }
}

export default useScreenWidth
