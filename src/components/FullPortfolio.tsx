import React, { useEffect } from "react"
import { useTheme, Spinner } from "@geist-ui/react"
import { Link } from "react-router-dom"
import ImageDisplay from "./ImageDisplay"
import useGridWidth from "../hooks/useGridWidth"

type FullPortfolioProps = {
  data: any
}

const FullPortfolio = ({ data }: FullPortfolioProps) => {
  const { type } = useTheme()
  const { gridWidth, gridRef } = useGridWidth()

  useEffect(() => {
    document.title = "Matan Mashraki | Portfolio"
  }, [])

  const getImageFor = (item: any) =>
    item.fields.Attachments.find((elem: any) => elem.filename === "Cover.png")
      .thumbnails.large

  const createItem = (item: any) => (
    <Link key={item.id} to={`/${item.fields.Path}`}>
      <div style={{ textAlign: "center" }}>
        <ImageDisplay
          style={{ marginBottom: -25 }}
          scale={0.9}
          alt={`${item.fields.Name} Cover`}
          gridWidth={gridWidth ?? 0}
          height={getImageFor(item).height}
          width={getImageFor(item).width}
          src={getImageFor(item).url}
        />
        <h3 style={{ color: type === "light" ? "black" : "white" }}>
          {item.fields.Name}
        </h3>
        <h5 style={{ color: type === "light" ? "black" : "white" }}>
          {item.fields.Description}
        </h5>
      </div>
    </Link>
  )

  return (
    <>
      <div className="center" style={{ opacity: gridWidth ? 0 : 1 }}>
        <Spinner size="large" />
      </div>
      <div
        className="grid"
        ref={gridRef}
        style={{ opacity: gridWidth ? 1 : 0 }}
      >
        {data.map((item: any) => createItem(item))}
      </div>
    </>
  )
}

export default FullPortfolio
