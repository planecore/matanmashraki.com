import React, { useEffect, useState } from "react"
import { Button, Row, Spinner } from "@geist-ui/react"
import { useParams } from "react-router-dom"
import NotFound from "../pages/NotFound"
import ReactMarkdown from "react-markdown"
import { Download, Code, ArrowLeft } from "@geist-ui/react-icons"
import { Link } from "react-router-dom"
import ImageDisplay from "./ImageDisplay"
import useScreenWidth from "../hooks/useScreenWidth"

type PortfolioItemProps = {
  data: any
}

const PortfolioItem = ({ data }: PortfolioItemProps) => {
  const { portfolioId } = useParams<any>()
  const { screenWidth } = useScreenWidth()
  const [showView, setShowView] = useState(false)
  const item = data.find((item: any) => item.fields.Path === portfolioId)

  useEffect(() => {
    item && (document.title = `Matan Mashraki | ${item.fields.Name}`)
  }, [item])

  useEffect(() => {
    setInterval(() => {
      setShowView(true)
    }, 25)
  }, [])

  const getImageFor = (item: any) =>
    item.fields.Attachments.find((elem: any) => elem.filename === "Cover.png")
      .thumbnails.large

  const createItem = (item: any) => (
    <div style={{ textAlign: "center" }}>
      <ImageDisplay
        style={{ marginBottom: -20, maxWidth: 525 }}
        scale={0.9}
        alt={`${item.fields.Name} Cover`}
        gridWidth={screenWidth}
        height={getImageFor(item).height}
        width={getImageFor(item).width}
        src={getImageFor(item).url}
      />
      <h1>{item.fields.Name}</h1>
      <h2 style={{ marginTop: -15 }}>{item.fields.Description}</h2>
    </div>
  )

  const createButtons = (item: any) => (
    <div style={{ textAlign: "center", marginBottom: 30, marginTop: 20 }}>
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
    <>
      <div className="center" style={{ opacity: showView ? 0 : 1 }}>
        <Spinner size="large" />
      </div>
      <div style={{ opacity: showView ? 1 : 0 }}>
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
    </>
  ) : (
    <NotFound />
  )
}

export default PortfolioItem
