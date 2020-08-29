import React, { useEffect, useState } from "react"
import { Display, Image } from "@geist-ui/react"

type ImageDisplayProps = {
  srcWebP: string
  srcPNG: string
  alt: string
  style?: object
  parentWidth: number
  width: number
  height: number
  scale?: number
}

type Size = {
  width?: number
  height?: number
}

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
