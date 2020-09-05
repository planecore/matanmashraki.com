import { createRef, useState, useEffect } from "react"

/** Returns the current width of a grid */
const useGridItemWidth = () => {
  const gridRef = createRef<HTMLDivElement>()
  const [gridItemWidth, setGridItemWidth] = useState<number>()
  const [prevWindowWidth, setPrevWindowWidth] = useState(0)

  useEffect(() => {
    const resizeListener = () => {
      // no need to update when previous width is bigger
      if (prevWindowWidth > window.innerWidth) return
      setPrevWindowWidth(window.innerWidth)
      // get first item width
      const parent = gridRef.current?.childNodes
      if (!parent) return
      setGridItemWidth((parent.item(0) as any).offsetWidth)
    }
    resizeListener()
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener)
  }, [gridRef])

  return {
    gridItemWidth,
    gridRef,
  }
}

export default useGridItemWidth
