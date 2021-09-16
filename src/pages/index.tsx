import { Tag, Row, Col, Button, Display, Description, useTheme, Image } from "@geist-ui/react"
import Emoji from "../components/utils/Emoji"
import Link from "../components/utils/Link"
import { ArrowRight, Github, Twitter, Linkedin, Mail } from "@geist-ui/react-icons"
import Head from "../components/layout/Head"
import { NextPage, GetStaticProps } from "next"
import fetchAirtable from "../data/fetchAirtable"
import { CompactResponse, CompactRecord } from "../data/types"
import fetchAge from "../data/fetchAge"
import PagesPreview from "../components/previews/PagesPreview"

type HomePageProps = {
  portfolio: CompactResponse
  blog: CompactResponse
  age: string
}

const skills = ["React", "Swift", "NodeJS", "Firebase", "Designer"]

const HomePage: NextPage<HomePageProps> = ({ portfolio, blog, age }) => {
  const { type } = useTheme()

  const title = (
    <>
      <h3>
        Hello there! <Emoji symbol="👋" label="Waving hand" />
      </h3>
      <h2>I'm Matan Mashraki</h2>
      <h3>
        {age} y/o Full Stack Developer from Israel <Emoji symbol="🇮🇱" label="Israel flag" />
      </h3>
    </>
  )

  const highlights = (
    <div style={{ marginTop: 25 }}>
      {skills.map((skill) => (
        <Tag key={skill} type="warning" style={{ margin: 3 }}>
          <b>{skill}</b>
        </Tag>
      ))}
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

  return (
    <>
      <Head title="Home" />
      {main}
      <PagesPreview title="Portfolio" response={portfolio} />
      <PagesPreview title="Blog" response={blog} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    portfolio: (await fetchAirtable("Portfolio", undefined, 6, true)) as CompactResponse,
    blog: (await fetchAirtable("Blog", undefined, 6, true)) as CompactResponse,
    age: await fetchAge(),
  },
  revalidate: 5,
})

export default HomePage
