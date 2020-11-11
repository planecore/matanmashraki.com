import {
  Tag,
  Row,
  Col,
  Button,
  Display,
  Description,
  useTheme,
  Image,
} from "@geist-ui/react"
import Emoji from "../components/Emoji"
import Link from "../components/Link"
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "@geist-ui/react-icons"
import Head from "../components/Head"
import { NextPage, GetStaticProps } from "next"
import fetchAirtable from "../data/fetchAirtable"
import { CompactResponse, CompactRecord } from "../data/types"

type HomePageProps = {
  portfolio: CompactResponse
  blog: CompactResponse
}

const HomePage: NextPage<HomePageProps> = ({ portfolio, blog }) => {
  const { type } = useTheme()

  const title = (
    <>
      <h3>
        Hello there! <Emoji symbol="👋" label="Waving hand" />
      </h3>
      <h2>I'm Matan Mashraki</h2>
      <h3>
        18 y/o Full Stack Developer from Israel{" "}
        <Emoji symbol="🇮🇱" label="Israel flag" />
      </h3>
    </>
  )

  const highlights = (
    <div style={{ marginTop: 25 }}>
      <Tag type="warning" style={{ margin: 3 }}>
        <b>React</b>
      </Tag>
      <Tag type="warning" style={{ margin: 3 }}>
        <b>Swift</b>
      </Tag>
      <Tag type="warning" style={{ margin: 3 }}>
        <b>NodeJS</b>
      </Tag>
      <Tag type="warning" style={{ margin: 3 }}>
        <b>Firebase</b>
      </Tag>
      <Tag type="warning" style={{ margin: 3 }}>
        <b>Designer</b>
      </Tag>
    </div>
  )

  const social = (
    <Row gap={2} justify="center" style={{ marginTop: 25 }}>
      <a
        target="_blank"
        href="https://github.com/planecore"
        rel="noopener noreferrer"
        style={{ margin: 10 }}
      >
        <Github color={type === "light" ? "black" : "white"} />
      </a>
      <a
        target="_blank"
        href="https://twitter.com/planecore"
        rel="noopener noreferrer"
        style={{ margin: 10 }}
      >
        <Twitter color={type === "light" ? "black" : "white"} />
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/matan-mashraki/"
        rel="noopener noreferrer"
        style={{ margin: 10 }}
      >
        <Linkedin color={type === "light" ? "black" : "white"} />
      </a>
      <Link href="/contact" style={{ margin: 10 }}>
        <Mail color={type === "light" ? "black" : "white"} />
      </Link>
    </Row>
  )

  const main = (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {title}
      {social}
      {highlights}
    </div>
  )

  const getImageFor = (record: CompactRecord) =>
    record.fields.Attachments.find((elem) => elem.filename === "Cover.webp")

  /**
   * Creates an item for a Portfolio record
   * @param record Record to create an item for
   * @param index Used to add left margin for the first item
   */
  const createPortfolioItem = (record: CompactRecord, index: number) => (
    <Link
      key={record.id}
      as={`/portfolio/${record.fields.Path}`}
      href="/portfolio/[item]"
    >
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
        <Description
          title={record.fields.Title}
          content={record.fields.Description}
        />
      </div>
    </Link>
  )

  const portfolioPreview = (
    <>
      <Row style={{ marginTop: 100, zIndex: 50 }}>
        <Col style={{ marginTop: 4 }}>
          <h4>Portfolio</h4>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Link href="/portfolio">
            <Button
              type="abort"
              iconRight={<ArrowRight />}
              style={{ marginLeft: -22, marginRight: -22 }}
            >
              Show Full Portfolio
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
        {portfolio.records.map((record: CompactRecord, index: number) =>
          createPortfolioItem(record, index)
        )}
      </Row>
    </>
  )

  /**
   * Creates an item for a Blog record
   * @param record Record to create an item for
   * @param index Used to add left margin for the first item
   */
  const createBlogItem = (record: CompactRecord, index: number) => (
    <Link
      key={record.id}
      as={`/blog/${record.fields.Path}`}
      href="/blog/[article]"
    >
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
        <Description
          title={record.fields.Title}
          content={record.fields.Description}
        />
      </div>
    </Link>
  )

  const blogPreview = (
    <>
      <Row style={{ marginTop: 100, zIndex: 50 }}>
        <Col style={{ marginTop: 4 }}>
          <h4>Blog</h4>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Link href="/blog">
            <Button
              type="abort"
              iconRight={<ArrowRight />}
              style={{ marginLeft: -22, marginRight: -22 }}
            >
              Show Full Blog
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
        {blog.records.map((record: CompactRecord, index: number) =>
          createBlogItem(record, index)
        )}
      </Row>
    </>
  )

  return (
    <>
      <Head title="Home" />
      {main}
      {portfolioPreview}
      {blogPreview}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    portfolio: (await fetchAirtable(
      "Portfolio",
      undefined,
      6,
      true
    )) as CompactResponse,
    blog: (await fetchAirtable("Blog", undefined, 6, true)) as CompactResponse,
  },
  revalidate: 5,
})

export default HomePage
