import React, { useEffect } from "react"
import { Spinner } from "@geist-ui/react"
import useAirtable from "../hooks/useAirtable"
import { BrowserRouter as Router, Route } from "react-router-dom"
import FullPortfolio from "../components/FullPortfolio"
import PortfolioItem from "../components/PortfolioItem"

const Portfolio = () => {
  const { isLoading, data } = useAirtable("Portfolio")

  useEffect(() => {
    document.title = "Matan Mashraki | Portfolio"
  }, [])

  return isLoading ? (
    <div className="center">
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
