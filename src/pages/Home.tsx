import React, { useEffect } from "react"
import {
  Tag,
  Row,
  Col,
  Button,
  Spinner,
  Display,
  Description,
  useTheme,
} from "@geist-ui/react"
import Emoji from "../components/Emoji"
import useAirtable from "../hooks/useAirtable"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "@geist-ui/react-icons"

const Home = () => {
  const portfolio = useAirtable("Portfolio")
  const blog = useAirtable("Blog")
  const { type } = useTheme()

  useEffect(() => {
    document.title = "Matan Mashraki"
  }, [])

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
      <Link to="/contact" style={{ margin: 10 }}>
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

  const createPortfolioItem = (item: any, index: number) => (
    <Link key={item.id} to={`/portfolio/${item.fields.Path}`}>
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
          <img
            width={320}
            alt={`${item.fields.Name} Cover`}
            src={
              item.fields.Attachments.find(
                (elem: any) => elem.filename === "Cover.png"
              ).thumbnails.large.url
            }
          />
        </Display>
        <Description
          title={item.fields.Name}
          content={item.fields.Description}
        />
      </div>
    </Link>
  )

  const portfolioPreview = (
    <>
      <Row style={{ marginTop: 100, zIndex: 50 }}>
        <Col>
          <h4>Portfolio</h4>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Link to="/portfolio">
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
      {portfolio.isLoading ? (
        <Row justify="center" align="middle" style={{ height: 280 }}>
          <Spinner size="large" />
        </Row>
      ) : (
        <Row
          style={{
            height: 280,
            overflow: "auto",
            marginLeft: -22,
            marginRight: -22,
            marginTop: -40,
          }}
        >
          {portfolio.data
            .sort((a: any, b: any) => a.fields.Order > b.fields.Order)
            .slice(0, 10)
            .map((item: any, index: number) =>
              createPortfolioItem(item, index)
            )}
        </Row>
      )}
    </>
  )

  const createBlogItem = (item: any, index: number) => (
    <Link key={item.id} to={`/blog/${item.fields.Path}`}>
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
          <img
            width={320}
            alt={`${item.fields.Name} Cover`}
            src={
              item.fields.Attachments.find(
                (elem: any) => elem.filename === "Cover.png"
              ).thumbnails.large.url
            }
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
        <Col>
          <h4>Blog</h4>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Link to="/blog">
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
      {blog.isLoading ? (
        <Row justify="center" align="middle" style={{ height: 280 }}>
          <Spinner size="large" />
        </Row>
      ) : (
        <Row
          style={{
            height: 280,
            overflow: "auto",
            marginLeft: -22,
            marginRight: -22,
            marginTop: -40,
          }}
        >
          {blog.data
            .sort((a: any, b: any) => a.fields.Order < b.fields.Order)
            .slice(0, 10)
            .map((item: any, index: number) => createBlogItem(item, index))}
        </Row>
      )}
    </>
  )

  return (
    <>
      {main}
      {portfolioPreview}
      {blogPreview}
    </>
  )
}

export default Home
