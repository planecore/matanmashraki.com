import React, { useEffect } from "react"
import { Spinner } from "@geist-ui/react"
import useAirtable from "../hooks/useAirtable"
import { BrowserRouter as Router, Route } from "react-router-dom"
import FullBlog from "../components/FullBlog"
import BlogItem from "../components/BlogItem"

const Blog = () => {
  const { isLoading, data } = useAirtable("Blog")

  useEffect(() => {
    document.title = "Matan Mashraki | Blog"
  }, [])

  return isLoading ? (
    <div className="center">
      <Spinner size="large" />
    </div>
  ) : (
    <Router basename="/blog">
      <Route exact path="/">
        <FullBlog data={data} />
      </Route>
      <Route path="/:blogId">
        <BlogItem data={data} />
      </Route>
    </Router>
  )
}

export default Blog
