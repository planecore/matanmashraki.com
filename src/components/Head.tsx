import * as NextHead from "next/head"

type HeadProps = {
  title: string
  desc?: string
  image?: string
}

const Head = ({
  title,
  desc = "18 y/o developer from Israel",
  image = "https://matanmashraki.com/preview.png",
}: HeadProps) => (
  <NextHead.default>
    <title>{`Matan Mashraki | ${title}`}</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <meta name="description" content={desc} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={`Matan Mashraki | ${title}`} />
    <meta property="og:description" content={desc} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`Matan Mashraki | ${title}`} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:image" content={image} />
  </NextHead.default>
)

export default Head
