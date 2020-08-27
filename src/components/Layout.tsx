import React, { createContext, useState, useEffect } from "react"
import { GeistProvider, CssBaseline, Page, useTheme } from "@geist-ui/react"
import Header from "./Header"

export type ThemeContextType = {
  theme: "light" | "dark"
  setThemeMode: (value: "auto" | "light" | "dark") => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setThemeMode: (val) => console.log(val),
})

type LayoutProps = {
  children: any
}

const Layout = ({ children }: LayoutProps) => {
  const [options, setOptions] = useState<"auto" | "light" | "dark">("auto")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    setOptions(getSelectedTheme())
    setTheme(getCurrentTheme())
  }, [])

  function getSelectedTheme() {
    return (window.localStorage.getItem("theme") ?? "auto") as
      | "auto"
      | "light"
      | "dark"
  }

  function getCurrentTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }

  useEffect(() => {
    if (options !== "auto") {
      setTheme(options)
    }
  }, [theme, options])

  useEffect(() => {
    const changeTheme = () => {
      if (options === "auto") {
        setTheme(getCurrentTheme())
      }
    }
    changeTheme()
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(() => changeTheme())
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeListener(() => changeTheme())
  }, [options])

  return (
    <GeistProvider theme={{ type: theme }}>
      <CssBaseline />
      <ThemeContext.Provider
        value={{ theme, setThemeMode: (val) => setOptions(val) }}
      >
        <Page>
          <Page.Header style={{ height: 77.66 }}>
            <Header />
            <div
              className="header-background"
              style={{ backgroundColor: theme === "light" ? "white" : "black" }}
            />
          </Page.Header>
          <Page.Content style={{ marginTop: -50 }}>{children}</Page.Content>
        </Page>
      </ThemeContext.Provider>
    </GeistProvider>
  )
}

export default Layout
