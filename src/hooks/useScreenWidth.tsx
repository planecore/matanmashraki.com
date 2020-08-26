import { useState, useEffect } from "react"

export default function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const resizeListener = () => {
      if (screenWidth > window.innerWidth) return
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
  }, [screenWidth])

  useEffect(() => {
    console.log(screenWidth)
  }, [screenWidth])

  return {
    screenWidth,
  }
}
