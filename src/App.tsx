import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { Page, useTheme } from "@geist-ui/react"
import Header from "./components/Header"
import "./assets/styles.css"
import Portfolio from "./pages/Portfolio"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"

const App = () => {
  const { type } = useTheme()

  return (
    <Router>
      <Page>
        <Page.Header style={{ height: 77.66 }}>
          <Header />
          <div
            className="header-background"
            style={{ backgroundColor: type === "light" ? "white" : "black" }}
          />
        </Page.Header>
        <Page.Content style={{ marginTop: -50 }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Page.Content>
      </Page>
    </Router>
  )
}

export default App
