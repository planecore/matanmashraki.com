import React, { useEffect, useState } from "react"
import { Button, Text, Row, Spinner } from "@geist-ui/react"
import { useParams } from "react-router-dom"
import NotFound from "../pages/NotFound"
import ReactMarkdown from "react-markdown/with-html"
import { ArrowLeft } from "@geist-ui/react-icons"
import { Link } from "react-router-dom"
import useScreenWidth from "../hooks/useScreenWidth"
import ImageDisplay from "./ImageDisplay"

type BlogItemProps = {
  data: any
}

const BlogItem = ({ data }: BlogItemProps) => {
  const { blogId } = useParams<any>()
  const { screenWidth } = useScreenWidth()
  const [showView, setShowView] = useState(false)
  const item = data.find((item: any) => item.fields.Path === blogId)

  useEffect(() => {
    item && (document.title = `Matan Mashraki | ${item.fields.Title}`)
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
        style={{ marginBottom: -10, maxWidth: 525 }}
        scale={0.9}
        alt={`${item.fields.Title} Cover`}
        gridWidth={screenWidth}
        height={getImageFor(item).height}
        width={getImageFor(item).width}
        src={getImageFor(item).url}
      />
      <Text type="secondary" style={{ marginBottom: -5 }}>
        {item.fields.Date}
      </Text>
      <h1>{item.fields.Title}</h1>
      <h2 style={{ marginTop: -15, marginBottom: 50 }}>
        {item.fields.Description}
      </h2>
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
            Back to Blog
          </Button>
        </Link>
        {createItem(item)}
        <Row justify="center">
          <div style={{ width: "90%" }}>
            <ReactMarkdown source={item.fields.Content} escapeHtml={false} />
          </div>
        </Row>
      </div>
    </>
  ) : (
    <NotFound />
  )
}

export default BlogItem
