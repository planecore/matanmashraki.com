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
import fetchAirtable from "../hooks/fetchAirtable"

type HomeProps = {
  portfolio: any
  blog: any
}

const Home: NextPage<HomeProps> = ({ portfolio, blog }) => {
  const { type } = useTheme()

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
      <Link href="/contactme" style={{ margin: 10 }}>
        <Mail color={type === "light" ? "black" : "white"} />
      </Link>
    </Row>
  )

  const main = (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h3>
        Hello there! <Emoji symbol="👋" label="Waving hand" />
      </h3>
      <h2>I'm Matan Mashraki</h2>
      <h3>
        18 y/o developer from Israel <Emoji symbol="🇮🇱" label="Israel flag" />
      </h3>
      {social}
      {highlights}
    </div>
  )

  const getImageFor = (item: any) =>
    item.fields.Attachments.find((elem: any) => elem.filename === "Cover.png")
      .thumbnails.large

  const createPortfolioItem = (item: any, index: number) => (
    <Link
      key={item.id}
      as={`/portfolio/${item.fields.Path}`}
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
            alt={`${item.fields.Title} Cover`}
            src={getImageFor(item).url}
          />
        </Display>
        <Description
          title={item.fields.Title}
          content={item.fields.Description}
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
        {portfolio.records.map((item: any, index: number) =>
          createPortfolioItem(item, index)
        )}
      </Row>
    </>
  )

  const createBlogItem = (item: any, index: number) => (
    <Link key={item.id} as={`/blog/${item.fields.Path}`} href="/blog/[article]">
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
            alt={`${item.fields.Title} Cover`}
            src={getImageFor(item).url}
          />
        </Display>
        <Description
          title={item.fields.Title}
          content={item.fields.Description}
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
        {blog.records.map((item: any, index: number) =>
          createBlogItem(item, index)
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
    portfolio: await fetchAirtable("Portfolio", undefined, 6, true),
    blog: await fetchAirtable("Blog", undefined, 6, true),
  },
})

export default Home
