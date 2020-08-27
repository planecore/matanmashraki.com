import { useState, useEffect } from "react"

const useScreenSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const resizeListener = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    resizeListener()
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
  }, [])

  return { width, height }
}

export default useScreenSize
