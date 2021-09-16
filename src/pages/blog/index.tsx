import { NextPage, GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { useTheme, Row, Col, Text } from "@geist-ui/react"
import Link from "../../components/utils/Link"
import useWindowWidth from "../../hooks/useWindowWidth"
import ImageDisplay from "../../components/utils/ImageDisplay"
import Head from "../../components/layout/Head"
import fetchAirtable from "../../data/fetchAirtable"
import { CompactResponse, CompactRecord } from "../../data/types"
import getImageFor from "../../data/getImageFor"

type BlogPageProps = {
  records: [CompactRecord]
}

const BlogPage: NextPage<BlogPageProps> = ({ records }) => {
  const { type } = useTheme()
  const { windowWidth } = useWindowWidth(false)
  const [showView, setShowView] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setShowView(true)
    }, 25)
  }, [])

  const createSmallItem = (record: CompactRecord) => (
    <div style={{ textAlign: "center" }}>
      <ImageDisplay
        style={{ marginBottom: -25 }}
        alt={`${record.fields.Title} Cover`}
        parentWidth={300}
        height={getImageFor(record).thumbnails.large.height}
        width={getImageFor(record).thumbnails.large.width}
        srcWebP={getImageFor(record).url}
        srcPNG={getImageFor(record).thumbnails.large.url}
      />
      <Text h5 type="secondary">
        {record.fields.Date}
      </Text>
      <h3 style={{ color: type === "light" ? "black" : "white" }}>{record.fields.Title}</h3>
      <h5 style={{ color: type === "light" ? "black" : "white" }}>{record.fields.Description}</h5>
    </div>
  )

  const createBigItem = (record: CompactRecord) => (
    <Row gap={0.8} align="middle">
      <Col span={10}>
        <ImageDisplay
          alt={`${record.fields.Title} Cover`}
          parentWidth={375}
          height={getImageFor(record).thumbnails.large.height}
          width={getImageFor(record).thumbnails.large.width}
          srcWebP={getImageFor(record).url}
          srcPNG={getImageFor(record).thumbnails.large.url}
        />
      </Col>
      <Col span={20}>
        <Text h5 type="secondary">
          {record.fields.Date}
        </Text>
        <h2 style={{ color: type === "light" ? "black" : "white" }}>{record.fields.Title}</h2>
        <h3 style={{ color: type === "light" ? "black" : "white" }}>{record.fields.Description}</h3>
      </Col>
    </Row>
  )

  const createItem = (record: CompactRecord) => (
    <Link key={record.id} as={`/blog/${record.fields.Path}`} href="/blog/[article]">
      {windowWidth < 700 ? createSmallItem(record) : createBigItem(record)}
    </Link>
  )

  return (
    <>
      <Head title="Blog" />
      <div className={windowWidth < 700 ? "grid" : ""} style={{ opacity: showView ? 1 : 0 }}>
        {records.map((record) => createItem(record))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    records: ((await fetchAirtable("Blog", undefined, undefined, true)) as CompactResponse).records,
  },
  revalidate: 5,
})

export default BlogPage
