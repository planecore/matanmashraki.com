import { NextPage, GetStaticProps, GetStaticPaths } from "next"
import { useEffect, useState } from "react"
import { Button, Text, Row, Spinner } from "@geist-ui/react"
import NotFound from "../../components/layout/NotFound"
import ReactMarkdown from "react-markdown/with-html"
import { ArrowLeft } from "@geist-ui/react-icons"
import Link from "../../components/utils/Link"
import useWindowWidth from "../../hooks/useWindowWidth"
import ImageDisplay from "../../components/utils/ImageDisplay"
import Head from "../../components/layout/Head"
import fetchAirtable from "../../data/fetchAirtable"
import { useRouter } from "next/router"
import { BlogRecord, BlogResponse, CompactResponse } from "../../data/types"

type BlogArticlePageProps = {
  record: BlogRecord
}

const BlogArticlePage: NextPage<BlogArticlePageProps> = ({ record }) => {
  const { windowWidth } = useWindowWidth()
  const [showView, setShowView] = useState(false)
  const { isFallback } = useRouter()

  useEffect(() => {
    setInterval(() => {
      setShowView(true)
    }, 25)
  }, [])

  const createItem = (record: BlogRecord) => (
    <div style={{ textAlign: "center" }}>
      <ImageDisplay
        style={{ marginBottom: -10, maxWidth: 525 }}
        scale={0.9}
        alt={`${record.fields.Title} Cover`}
        parentWidth={windowWidth}
        height={512}
        width={766}
        src={record.fields.Cover}
      />
      <Text type="secondary" style={{ marginBottom: -5 }}>
        {record.fields.Date}
      </Text>
      <h1>{record.fields.Title}</h1>
      <h2 style={{ marginTop: -15, marginBottom: 50 }}>
        {record.fields.Description}
      </h2>
    </div>
  )

  return record ? (
    <>
      <Head
        title={record.fields.Title}
        desc={record.fields.Description}
        image={record.fields.Cover}
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
        {createItem(record)}
        <Row justify="center">
          <div className="markdown">
            <ReactMarkdown source={record.fields.Content} escapeHtml={false} />
          </div>
        </Row>
      </div>
    </>
  ) : isFallback ? (
    <div className="center">
      <Spinner size="large" />
    </div>
  ) : (
    <NotFound />
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (
    (await fetchAirtable("Blog", undefined, undefined, true)) as CompactResponse
  ).records.map((record) => ({
    params: {
      article: record.fields.Path,
    },
  })),
  fallback: true,
})

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = (
    (await fetchAirtable("Blog", ctx.params.article as string)) as BlogResponse
  ).records
  return {
    props: {
      record: res && res[0] ? res[0] : null,
    },
    revalidate: 5,
  }
}

export default BlogArticlePage
