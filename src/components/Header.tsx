import React, { useState, useEffect, createRef, useContext } from "react"
import { Tabs, useTheme, Row, Select } from "@geist-ui/react"
import { useLocation, useHistory } from "react-router-dom"
import logoLight from "../assets/logo-color.svg"
import logoDark from "../assets/logo-white.svg"
import { ThemeContextType, ThemeContext } from ".."
import { Sun, Moon, Droplet } from "@geist-ui/react-icons"

const Header = () => {
  const { type } = useTheme()
  const { setThemeMode } = useContext<ThemeContextType>(ThemeContext)
  const [selectedTheme, setSelectedTheme] = useState<string>(getTheme())
  const { pathname } = useLocation()
  const history = useHistory()
  const [path, setPath] = useState(pathname)
  const headerRef = createRef<HTMLDivElement>()
  const [base, setBase] = useState(calculateBase(pathname))

  useEffect(() => {
    if (history.location.pathname !== path) history.push(path)
  }, [path, history])

  useEffect(() => {
    const ref = headerRef.current
    if (!ref) return
    const content = ref.querySelector(".content")
    if (content) content.remove()
  }, [headerRef])

  function calculateBase(fullpath: string) {
    return `/${fullpath.split("/")[1]}`
  }

  useEffect(() => {
    setPath(pathname)
    setBase(calculateBase(pathname))
  }, [pathname])

  function getTheme() {
    return window.localStorage.getItem("theme") ?? "auto"
  }

  useEffect(() => {
    setThemeMode(selectedTheme as "auto" | "light" | "dark")
    window.localStorage.removeItem("theme")
    if (selectedTheme !== "auto") {
      window.localStorage.setItem("theme", selectedTheme)
    }
  }, [selectedTheme, setThemeMode])

  const createLabel = (title: string, icon: JSX.Element) => (
    <Row justify="center">
      <div style={{ marginRight: 5, marginTop: 3 }}>{icon}</div>
      <div style={{ marginTop: 1 }}>{title}</div>
    </Row>
  )

  const logo = (
    <button onClick={() => setPath("/")} className="unstyled-button">
      <img
        src={type === "light" ? logoLight : logoDark}
        height={25}
        alt="Logo"
      />
    </button>
  )

  const themeSwitcher = (
    <div style={{ position: "relative" }}>
      <Row style={{ position: "absolute" }}>
        <div style={{ height: 40, width: 104, zIndex: 110 }} />
        {type === "light" ? <Sun /> : <Moon />}
      </Row>
      <Select
        value={selectedTheme}
        onChange={(val) => setSelectedTheme(val.toString())}
        size="small"
        style={{ opacity: 0, zIndex: 105 }}
        pure
      >
        <Select.Option value="auto">
          {createLabel("Automatic", <Droplet size={14} />)}
        </Select.Option>
        <Select.Option value="light">
          {createLabel("Light", <Sun size={14} />)}
        </Select.Option>
        <Select.Option value="dark">
          {createLabel("Dark", <Moon size={14} />)}
        </Select.Option>
      </Select>
    </div>
  )

  const tabs = (
    <Tabs value={base} onChange={(val) => setPath(val)}>
      <Tabs.Item label="Home" value="/" />
      <Tabs.Item label="Portfolio" value="/portfolio" />
      <Tabs.Item label="Blog" value="/blog" />
      <Tabs.Item label="Contact" value="/contact" />
    </Tabs>
  )

  return (
    <div className="header" ref={headerRef}>
      <div className="header-content">
        <div style={{ paddingTop: 10, paddingBottom: 5 }}>
          <Row justify="space-between">
            {logo}
            {themeSwitcher}
          </Row>
        </div>
        {tabs}
      </div>
    </div>
  )
}

export default Header
