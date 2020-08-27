import React from "react"

const { Helmet } = require("react-helmet")

const createHead = (title: string, desc?: string, image?: string) => (
  <Helmet>
    <title>{`Matan Mashraki | ${title}`}</title>
    <meta name="description" content={desc ?? "18 y/o developer from Israel"} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={`Matan Mashraki | ${title}`} />
    <meta
      property="og:description"
      content={desc ?? "18 y/o developer from Israel"}
    />
    <meta
      property="og:image"
      content={image ?? "https://matanmashraki.com/preview.png"}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`Matan Mashraki | ${title}`} />
    <meta
      name="twitter:description"
      content={desc ?? "18 y/o developer from Israel"}
    />
    <meta
      name="twitter:image"
      content={image ?? "https://matanmashraki.com/preview.png"}
    />
  </Helmet>
)

export default createHead
