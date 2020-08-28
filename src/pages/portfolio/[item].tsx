import { NextPage, GetStaticProps, GetStaticPaths } from "next"
import { Button, Row, Spinner } from "@geist-ui/react"
import NotFound from "../../components/NotFound"
import ReactMarkdown from "react-markdown"
import { Download, Code, ArrowLeft } from "@geist-ui/react-icons"
import Link from "../../components/Link"
import ImageDisplay from "../../components/ImageDisplay"
import useScreenWidth from "../../hooks/useScreenWidth"
import Head from "../../components/Head"
import fetchAirtable from "../../hooks/fetchAirtable"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

type PortfolioItemProps = {
  item: any
}

const PortfolioItem: NextPage<PortfolioItemProps> = ({ item }) => {
  const { screenWidth } = useScreenWidth()
  const [showView, setShowView] = useState(false)
  const { isFallback } = useRouter()

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
        alt={`${item.fields.Title} Cover`}
        gridWidth={screenWidth}
        height={getImageFor(item).height}
        width={getImageFor(item).width}
        src={getImageFor(item).url}
      />
      <h1>{item.fields.Title}</h1>
      <h2 style={{ marginTop: -15 }}>{item.fields.Description}</h2>
    </div>
  )

  const createButtons = (item: any) => (
    <div style={{ textAlign: "center", marginBottom: 30, marginTop: 20 }}>
      {item.fields.PrimaryButton && (
        <a href={item.fields.PrimaryButton} style={{ padding: 5 }}>
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
      <Head
        title={item.fields.Title}
        desc={item.fields.Description}
        image={getImageFor(item).url}
      />
      <div style={{ opacity: showView ? 1 : 0 }}>
        <Link href="/portfolio">
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
    await fetchAirtable("Portfolio", undefined, undefined, true)
  ).records.map((item) => ({
    params: {
      item: item.fields.Path,
    },
  })),
  fallback: true,
})

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = (await fetchAirtable("Portfolio", ctx.params.item as string))
    .records
  return {
    props: {
      item: res && res[0] ? res[0] : null,
    },
    revalidate: 5,
  }
}

export default PortfolioItem
