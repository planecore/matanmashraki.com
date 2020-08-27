import { useState, useEffect } from "react"

export default function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState<number>(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    const resizeListener = () => {
      if (screenWidth > window.innerWidth) return
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
  }, [screenWidth])

  return {
    screenWidth,
  }
}
