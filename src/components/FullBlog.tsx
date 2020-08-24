import React, { useEffect } from "react"
import { Display, useTheme, Row, Col, Text } from "@geist-ui/react"
import { Link } from "react-router-dom"
import useScreenSize from "../hooks/useScreenSize"

type FullBlogProps = {
  data: any
}

const FullBlog = ({ data }: FullBlogProps) => {
  const { type } = useTheme()
  const { width } = useScreenSize()

  useEffect(() => {
    document.title = "Matan Mashraki | Blog"
  }, [])

  const createSmallItem = (item: any) => (
    <div style={{ textAlign: "center" }}>
      <Display shadow style={{ marginBottom: -20 }}>
        <img
          alt={`${item.fields.Name} Cover`}
          src={
            item.fields.Attachments.find(
              (elem: any) => elem.filename === "Cover.png"
            ).thumbnails.large.url
          }
        />
      </Display>
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
        <Display shadow>
          <img
            alt={`${item.fields.Name} Cover`}
            src={
              item.fields.Attachments.find(
                (elem: any) => elem.filename === "Cover.png"
              ).thumbnails.large.url
            }
          />
        </Display>
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
    <div className={width < 700 ? "grid" : ""}>
      {data
        .sort((a: any, b: any) => a.fields.Order < b.fields.Order)
        .map((item: any) => createItem(item))}
    </div>
  )
}

export default FullBlog
