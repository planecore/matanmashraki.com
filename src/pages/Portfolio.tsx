import React from "react"
import { Spinner } from "@geist-ui/react"
import useAirtable from "../hooks/useAirtable"
import { BrowserRouter as Router, Route } from "react-router-dom"
import FullPortfolio from "../components/FullPortfolio"
import PortfolioItem from "../components/PortfolioItem"
import createHead from "../support/createHead"

const Portfolio = () => {
  const { isLoading, data } = useAirtable("Portfolio")

  return isLoading ? (
    <div className="center">
      {createHead("Blog")}
      <Spinner size="large" />
    </div>
  ) : (
    <Router basename="/portfolio">
      <Route exact path="/">
        <FullPortfolio data={data} />
      </Route>
      <Route path="/:portfolioId">
        <PortfolioItem data={data} />
      </Route>
    </Router>
  )
}

export default Portfolio
