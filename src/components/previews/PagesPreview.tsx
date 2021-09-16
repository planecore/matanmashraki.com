import React from "react"
import { Display, Description, Image, Button, Col, Row } from "@geist-ui/react"
import Link from "../utils/Link"
import getImageFor from "../../data/getImageFor"
import { CompactRecord, CompactResponse } from "../../data/types"
import { ArrowRight } from "@geist-ui/react-icons"

type PagesPreviewProps = {
  title: string
  response: CompactResponse
}

const PagesPreview = ({ title, response }: PagesPreviewProps) => {
  const path = title.toLowerCase()

  /**
   * Creates an item for a record
   * @param record Record to create an item for
   * @param index Used to add left margin for the first item
   */
  const createItem = (record: CompactRecord, index: number) => (
    <Link key={record.id} as={`/${path}/${record.fields.Path}`} href={`/${path}/[article]`}>
      <div
        style={{
          textAlign: "left",
          float: "left",
          width: 250,
          marginRight: 10,
          marginLeft: index === 0 ? 22 : 0,
        }}
      >
        <Display style={{ marginBottom: -10 }}>
          <Image
            width={250}
            height={167}
            alt={`${record.fields.Title} Cover`}
            // TODO: Change to `getImageFor(record).url` after iOS 14
            // gets significant market share.
            src={getImageFor(record).thumbnails.large.url}
          />
        </Display>
        <Description title={record.fields.Title} content={record.fields.Description} />
      </div>
    </Link>
  )

  return (
    <>
      <Row style={{ marginTop: 100, zIndex: 50 }}>
        <Col style={{ marginTop: 4 }}>
          <h4>{title}</h4>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Link href={`/${path}`}>
            <Button
              type="abort"
              iconRight={<ArrowRight />}
              style={{ marginLeft: -22, marginRight: -22 }}
            >
              Show Full {title}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row
        style={{
          height: 280,
          overflow: "auto",
          marginLeft: -22,
          marginRight: -22,
          marginTop: -40,
        }}
      >
        {response.records.map((record: CompactRecord, index: number) => createItem(record, index))}
      </Row>
    </>
  )
}

export default PagesPreview
