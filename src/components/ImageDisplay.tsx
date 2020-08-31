import React, { useEffect, useState, CSSProperties } from "react"
import { Display, Image } from "@geist-ui/react"

type ImageDisplayProps = {
  srcWebP: string
  srcPNG: string
  alt: string
  style?: CSSProperties
  parentWidth: number
  width: number
  height: number
  scale?: number
}

type Size = {
  width?: number
  height?: number
}

/** Creates an image display with loading animation */
const ImageDisplay = ({
  srcWebP,
  srcPNG,
  alt,
  style,
  parentWidth,
  width,
  height,
  scale = 1.0,
}: ImageDisplayProps) => {
  const [size, setSize] = useState<Size>({})

  // used to calculate the image size during the
  // loading animation
  useEffect(() => {
    if (parentWidth === 0) return
    setSize({
      width: parentWidth * scale,
      height: (height / (width / parentWidth)) * scale,
    })
  }, [parentWidth, scale, width, height])

  return (
    <div>
      {size.height && size.width && (
        <Display shadow style={style}>
          <Image
            alt={alt}
            src={(window as any).safari ? srcPNG : srcWebP}
            width={size.width}
            height={size.height}
          />
        </Display>
      )}
    </div>
  )
}

export default ImageDisplay
