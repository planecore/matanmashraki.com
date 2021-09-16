import { NextPage, GetStaticProps, GetStaticPaths } from "next"
import { Button, Row, Spinner } from "@geist-ui/react"
import NotFound from "../../components/layout/NotFound"
import ReactMarkdown from "react-markdown"
import { Download, Code, ArrowLeft } from "@geist-ui/react-icons"
import Link from "../../components/utils/Link"
import ImageDisplay from "../../components/utils/ImageDisplay"
import useWindowWidth from "../../hooks/useWindowWidth"
import Head from "../../components/layout/Head"
import fetchAirtable from "../../data/fetchAirtable"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { CompactResponse, PortfolioResponse, PortfolioRecord } from "../../data/types"

type PortfolioItemPageProps = {
  record: PortfolioRecord
}

const PortfolioItemPage: NextPage<PortfolioItemPageProps> = ({ record }) => {
  const { windowWidth } = useWindowWidth()
  const [showView, setShowView] = useState(false)
  const { isFallback } = useRouter()

  useEffect(() => {
    setInterval(() => {
      setShowView(true)
    }, 25)
  }, [])

  const getImage = () => record.fields.Attachments.find((elem) => elem.filename === "Cover.webp")

  const createItem = (record: PortfolioRecord) => (
    <div style={{ textAlign: "center" }}>
      <ImageDisplay
        style={{ marginBottom: -20, maxWidth: 525 }}
        scale={0.9}
        alt={`${record.fields.Title} Cover`}
        parentWidth={windowWidth}
        height={getImage().thumbnails.large.height}
        width={getImage().thumbnails.large.width}
        srcWebP={getImage().url}
        srcPNG={getImage().thumbnails.large.url}
      />
      <h1>{record.fields.Title}</h1>
      <h2 style={{ marginTop: -15 }}>{record.fields.Description}</h2>
    </div>
  )

  const createButtons = (record: PortfolioRecord) => (
    <div style={{ textAlign: "center", marginBottom: 30, marginTop: 20 }}>
      {record.fields.PrimaryButton && (
        <a href={record.fields.PrimaryButton} style={{ padding: 5 }}>
          <Button auto shadow type="secondary" icon={<Download />}>
            Download
          </Button>
        </a>
      )}
      {record.fields.SecondButton && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={record.fields.SecondButton}
          style={{ padding: 5 }}
        >
          <Button auto shadow type="secondary" icon={<Code />}>
            Source Code
          </Button>
        </a>
      )}
    </div>
  )

  return record ? (
    <>
      <Head
        title={record.fields.Title}
        desc={record.fields.Description}
        image={getImage().thumbnails.large.url}
      />
      <div style={{ opacity: showView ? 1 : 0 }}>
        <Link href="/portfolio">
          <Button type="abort" icon={<ArrowLeft />} style={{ marginLeft: -22, marginRight: -22 }}>
            Back to Portfolio
          </Button>
        </Link>
        {createItem(record)}
        {createButtons(record)}
        <Row justify="center">
          <div className="markdown">
            <ReactMarkdown source={record.fields.Content} />
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
    (await fetchAirtable("Portfolio", undefined, undefined, true)) as CompactResponse
  ).records.map((record) => ({
    params: {
      item: record.fields.Path,
    },
  })),
  fallback: true,
})

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = ((await fetchAirtable("Portfolio", ctx.params.item as string)) as PortfolioResponse)
    .records
  return {
    props: {
      record: res && res[0] ? res[0] : null,
    },
    revalidate: 5,
  }
}

export default PortfolioItemPage
