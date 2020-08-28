import { NextPage, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { useTheme, Row, Col, Text } from "@geist-ui/react"
import Link from "../../components/Link"
import useScreenSize from "../../hooks/useScreenSize"
import ImageDisplay from "../../components/ImageDisplay"
import Head from "../../components/Head"
import fetchAirtable from "../../hooks/fetchAirtable"

type FullBlogProps = {
  data: any
}

const FullBlog: NextPage<FullBlogProps> = ({ data }) => {
  const { type } = useTheme()
  const { width } = useScreenSize()
  const [showView, setShowView] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setShowView(true)
    }, 25)
  }, [])

  const getImageFor = (item: any) =>
    item.fields.Attachments.find((elem: any) => elem.filename === "Cover.png")
      .thumbnails.large

  const createSmallItem = (item: any) => (
    <div style={{ textAlign: "center" }}>
      <ImageDisplay
        style={{ marginBottom: -25 }}
        alt={`${item.fields.Title} Cover`}
        gridWidth={300}
        height={getImageFor(item).height}
        width={getImageFor(item).width}
        src={getImageFor(item).url}
      />
      <Text h5 type="secondary">
        {item.fields.Date}
      </Text>
      <h3 style={{ color: type === "light" ? "black" : "white" }}>
        {item.fields.Title}
      </h3>
      <h5 style={{ color: type === "light" ? "black" : "white" }}>
        {item.fields.Description}
      </h5>
    </div>
  )

  const createBigItem = (item: any) => (
    <Row gap={0.8} align="middle">
      <Col span={10}>
        <ImageDisplay
          alt={`${item.fields.Title} Cover`}
          gridWidth={375}
          height={getImageFor(item).height}
          width={getImageFor(item).width}
          src={getImageFor(item).url}
        />
      </Col>
      <Col span={20}>
        <Text h5 type="secondary">
          {item.fields.Date}
        </Text>
        <h2 style={{ color: type === "light" ? "black" : "white" }}>
          {item.fields.Title}
        </h2>
        <h3 style={{ color: type === "light" ? "black" : "white" }}>
          {item.fields.Description}
        </h3>
      </Col>
    </Row>
  )

  const createItem = (item: any) => (
    <Link key={item.id} as={`/blog/${item.fields.Path}`} href="/blog/[article]">
      {width < 700 ? createSmallItem(item) : createBigItem(item)}
    </Link>
  )

  return (
    <>
      <Head title="Blog" />
      <div
        className={width < 700 ? "grid" : ""}
        style={{ opacity: showView ? 1 : 0 }}
      >
        {data.map((item: any) => createItem(item))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    data: (await fetchAirtable("Blog", undefined, undefined, true)).records,
  },
  revalidate: 5,
})

export default FullBlog
