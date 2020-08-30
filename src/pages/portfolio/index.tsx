import { NextPage, GetStaticProps } from "next"
import { useTheme } from "@geist-ui/react"
import Link from "../../components/Link"
import ImageDisplay from "../../components/ImageDisplay"
import useGridWidth from "../../hooks/useGridWidth"
import Head from "../../components/Head"
import fetchAirtable from "../../data/fetchAirtable"
import { CompactRecord, CompactResponse } from "../../data/types"

type PortfolioPageProps = {
  records: [CompactRecord]
}

const PortfolioPage: NextPage<PortfolioPageProps> = ({ records }) => {
  const { type } = useTheme()
  const { gridWidth, gridRef } = useGridWidth()

  const getImageFor = (record: CompactRecord) =>
    record.fields.Attachments.find((elem) => elem.filename === "Cover.webp")

  const createItem = (record: CompactRecord) => (
    <Link
      key={record.id}
      as={`/portfolio/${record.fields.Path}`}
      href="/portfolio/[item]"
    >
      <div style={{ textAlign: "center" }}>
        <ImageDisplay
          style={{ marginBottom: -25 }}
          scale={0.9}
          alt={`${record.fields.Title} Cover`}
          parentWidth={gridWidth ?? 0}
          height={getImageFor(record).thumbnails.large.height}
          width={getImageFor(record).thumbnails.large.width}
          srcWebP={getImageFor(record).url}
          srcPNG={getImageFor(record).thumbnails.large.url}
        />
        <h3 style={{ color: type === "light" ? "black" : "white" }}>
          {record.fields.Title}
        </h3>
        <h5 style={{ color: type === "light" ? "black" : "white" }}>
          {record.fields.Description}
        </h5>
      </div>
    </Link>
  )

  return (
    <>
      <Head title="Portfolio" />
      <div
        className="grid"
        ref={gridRef}
        style={{ opacity: gridWidth ? 1 : 0 }}
      >
        {records.map((record) => createItem(record))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    records: ((await fetchAirtable(
      "Portfolio",
      undefined,
      undefined,
      true
    )) as CompactResponse).records,
  },
  revalidate: 5,
})

export default PortfolioPage
