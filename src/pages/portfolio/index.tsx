import { NextPage } from 'next'
import { useTheme } from "@geist-ui/react"
import Link from "../../components/Link"
import ImageDisplay from "../../components/ImageDisplay"
import useGridWidth from "../../hooks/useGridWidth"
import Head from "../../components/Head"
import fetchAirtable from '../../hooks/fetchAirtable'

type FullPortfolioProps = {
  data: any
}

const FullPortfolio: NextPage<FullPortfolioProps> = ({ data }) => {
  const { type } = useTheme()
  const { gridWidth, gridRef } = useGridWidth()

  const getImageFor = (item: any) =>
    item.fields.Attachments.find((elem: any) => elem.filename === "Cover.png")
      .thumbnails.large

  const createItem = (item: any) => (
    <Link key={item.id} as={`/portfolio/${item.fields.Path}`} href="/portfolio/[item]">
      <div style={{ textAlign: "center" }}>
        <ImageDisplay
          style={{ marginBottom: -25 }}
          scale={0.9}
          alt={`${item.fields.Title} Cover`}
          gridWidth={gridWidth ?? 0}
          height={getImageFor(item).height}
          width={getImageFor(item).width}
          src={getImageFor(item).url}
        />
        <h3 style={{ color: type === "light" ? "black" : "white" }}>
          {item.fields.Title}
        </h3>
        <h5 style={{ color: type === "light" ? "black" : "white" }}>
          {item.fields.Description}
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
        {data.records.map((item: any) => createItem(item))}
      </div>
    </>
  )
}

FullPortfolio.getInitialProps = async () => ({
  data: await fetchAirtable("Portfolio")
})

export default FullPortfolio
