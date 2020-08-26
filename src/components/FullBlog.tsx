import React, { useEffect, useState } from "react"
import { useTheme, Row, Col, Text, Spinner } from "@geist-ui/react"
import { Link } from "react-router-dom"
import useScreenSize from "../hooks/useScreenSize"
import ImageDisplay from "./ImageDisplay"

type FullBlogProps = {
  data: any
}

const FullBlog = ({ data }: FullBlogProps) => {
  const { type } = useTheme()
  const { width } = useScreenSize()
  const [showView, setShowView] = useState(false)

  useEffect(() => {
    document.title = "Matan Mashraki | Blog"
  }, [])

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
    <Link key={item.id} to={`/${item.fields.Path}`}>
      {width < 700 ? createSmallItem(item) : createBigItem(item)}
    </Link>
  )

  return (
    <>
      <div className="center" style={{ opacity: showView ? 0 : 1 }}>
        <Spinner size="large" />
      </div>
      <div className="grid" style={{ opacity: showView ? 1 : 0 }}>
        {data.map((item: any) => createItem(item))}
      </div>
    </>
  )
}

export default FullBlog
