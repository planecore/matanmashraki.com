import React, { useEffect } from "react"
import { Display, Button, Text, Row } from "@geist-ui/react"
import { useParams } from "react-router-dom"
import NotFound from "../pages/NotFound"
import ReactMarkdown from "react-markdown/with-html"
import { ArrowLeft } from "@geist-ui/react-icons"
import { Link } from "react-router-dom"

type BlogItemProps = {
  data: any
}

const BlogItem = ({ data }: BlogItemProps) => {
  const { blogId } = useParams<any>()
  const item = data.find((item: any) => item.fields.Path === blogId)

  useEffect(() => {
    item && (document.title = `Matan Mashraki | ${item.fields.Title}`)
  }, [item])

  const createItem = (item: any) => (
    <div style={{ textAlign: "center" }}>
      <Display shadow style={{ marginBottom: -10 }}>
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
    <div>
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
  ) : (
    <NotFound />
  )
}

export default BlogItem
