import { createRef, useState, useEffect } from "react"

const useGridWidth = () => {
  const gridRef = createRef<HTMLDivElement>()
  const [gridWidth, setGridWidth] = useState<number>()
  const [prevWindowWidth, setPrevWindowWidth] = useState(0)

  useEffect(() => {
    const resizeListener = () => {
      if (prevWindowWidth > window.innerWidth) return
      setPrevWindowWidth(window.innerWidth)
      const parent = gridRef.current?.childNodes
      if (!parent) return
      setGridWidth((parent.item(0) as any).offsetWidth)
    }
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
    // eslint-disable-next-line
  }, [gridRef])

  useEffect(() => {
    const parent = gridRef.current?.childNodes
    if (!parent) return
    setGridWidth((parent.item(0) as any).offsetWidth)
  }, [gridRef])

  return {
    gridWidth,
    gridRef,
  }
}

export default useGridWidth
