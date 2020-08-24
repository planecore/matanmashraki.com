import React, { useEffect } from "react"
import { Display, Button, Row } from "@geist-ui/react"
import { useParams } from "react-router-dom"
import NotFound from "../pages/NotFound"
import ReactMarkdown from "react-markdown"
import { Download, Code, ArrowLeft } from "@geist-ui/react-icons"
import { Link } from "react-router-dom"

type PortfolioItemProps = {
  data: any
}

const PortfolioItem = ({ data }: PortfolioItemProps) => {
  const { portfolioId } = useParams<any>()
  const item = data.find((item: any) => item.fields.Path === portfolioId)

  useEffect(() => {
    item && (document.title = `Matan Mashraki | ${item.fields.Name}`)
  }, [item])

  const createItem = (item: any) => (
    <div style={{ textAlign: "center" }}>
      <Display shadow style={{ marginBottom: -20 }}>
        <img
          width={525}
          alt={`${item.fields.Name} Cover`}
          src={
            item.fields.Attachments.find(
              (elem: any) => elem.filename === "Cover.png"
            ).thumbnails.large.url
          }
        />
      </Display>
      <h1>{item.fields.Name}</h1>
      <h2 style={{ marginTop: -15 }}>{item.fields.Description}</h2>
    </div>
  )

  const createButtons = (item: any) => (
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      {item.fields.PrimaryButton && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={item.fields.PrimaryButton}
          style={{ padding: 5 }}
        >
          <Button auto shadow type="secondary" icon={<Download />}>
            Download
          </Button>
        </a>
      )}
      {item.fields.SecondButton && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={item.fields.SecondButton}
          style={{ padding: 5 }}
        >
          <Button auto shadow type="secondary" icon={<Code />}>
            Source Code
          </Button>
        </a>
      )}
    </div>
  )

  return item ? (
    <div>
      <Link to="/">
        <Button
          type="abort"
          icon={<ArrowLeft />}
          style={{ marginLeft: -22, marginRight: -22 }}
        >
          Back to Portfolio
        </Button>
      </Link>
      {createItem(item)}
      {createButtons(item)}
      <Row justify="center">
        <div style={{ width: "90%" }}>
          <ReactMarkdown source={item.fields.Content} />
        </div>
      </Row>
    </div>
  ) : (
    <NotFound />
  )
}

export default PortfolioItem
