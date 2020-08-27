import React, { useEffect, useState } from "react"
import { Display, Image } from "@geist-ui/react"

type ImageDisplayProps = {
  src: string
  alt: string
  style?: object
  gridWidth: number
  width: number
  height: number
  scale?: number
}

type Size = {
  width?: number
  height?: number
}

const ImageDisplay = ({
  src,
  alt,
  style,
  gridWidth,
  width,
  height,
  scale = 1.0,
}: ImageDisplayProps) => {
  const [size, setSize] = useState<Size>({})

  useEffect(() => {
    if (gridWidth === 0) return
    setSize({
      width: gridWidth * scale,
      height: (height / (width / gridWidth)) * scale,
    })
  }, [gridWidth, scale, width, height])

  return (
    <div>
      {size.height && size.width && (
        <Display shadow style={style}>
          <Image
            alt={alt}
            src={src}
            width={size.width}
            height={size.height}
          />
        </Display>
      )}
    </div>
  )
}

export default ImageDisplay
