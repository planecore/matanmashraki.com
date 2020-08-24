import React, { useEffect } from "react"
import { Display, useTheme } from "@geist-ui/react"
import { Link } from "react-router-dom"

type FullPortfolioProps = {
  data: any
}

const FullPortfolio = ({ data }: FullPortfolioProps) => {
  const { type } = useTheme()

  useEffect(() => {
    document.title = "Matan Mashraki | Portfolio"
  }, [])

  const createItem = (item: any) => (
    <Link key={item.id} to={`/${item.fields.Path}`}>
      <div style={{ textAlign: "center" }}>
        <Display shadow style={{ marginBottom: -20 }}>
          <img
            alt={`${item.fields.Name} Cover`}
            src={
              item.fields.Attachments.find(
                (elem: any) => elem.filename === "Cover.png"
              ).thumbnails.large.url
            }
          />
        </Display>
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
    <div className="grid">
      {data
        .sort((a: any, b: any) => a.fields.Order > b.fields.Order)
        .map((item: any) => createItem(item))}
    </div>
  )
}

export default FullPortfolio
