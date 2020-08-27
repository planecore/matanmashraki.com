import { NextPage } from "next"
import { useEffect, useState } from "react"
import { Button, Text, Row } from "@geist-ui/react"
import NotFound from "../../components/NotFound"
import ReactMarkdown from "react-markdown/with-html"
import { ArrowLeft } from "@geist-ui/react-icons"
import Link from "../../components/Link"
import useScreenWidth from "../../hooks/useScreenWidth"
import ImageDisplay from "../../components/ImageDisplay"
import Head from "../../components/Head"
import fetchAirtable from "../../hooks/fetchAirtable"

type BlogItemProps = {
  item: any
}

const BlogItem: NextPage<BlogItemProps> = ({ item }) => {
  const { screenWidth } = useScreenWidth()
  const [showView, setShowView] = useState(false)

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
      <Head
        title={item.fields.Title}
        desc={item.fields.Description}
        image={getImageFor(item).url}
      />
      <div style={{ opacity: showView ? 1 : 0 }}>
        <Link href="/blog">
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

BlogItem.getInitialProps = async (ctx) => ({
  item: (await fetchAirtable("Blog", ctx.query.article as string)).records[0]
})

export default BlogItem
