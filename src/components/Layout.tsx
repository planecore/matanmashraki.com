import React, { createContext, useState, useEffect } from "react"
import { GeistProvider, CssBaseline, Page, Spinner } from "@geist-ui/react"
import { useRouter } from "next/router"
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
  const [isLoading, setIsLoading] = useState(false)
  const { events } = useRouter()

  useEffect(() => {
    setOptions(getSelectedTheme())
    setTheme(getSystemTheme())

    const handleStart = () => setIsLoading(true)
    const handleEnd = () => setIsLoading(false)

    events.on("routeChangeStart", handleStart)
    events.on("routeChangeComplete", handleEnd)
    events.on("routeChangeError", handleEnd)

    return () => {
      events.off("routeChangeStart", handleStart)
      events.off("routeChangeComplete", handleEnd)
      events.off("routeChangeError", handleEnd)
    }
  }, [])

  function getSelectedTheme() {
    return (window.localStorage.getItem("theme") ?? "auto") as
      | "auto"
      | "light"
      | "dark"
  }

  function getSystemTheme() {
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
        setTheme(getSystemTheme())
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
          <Page.Content>
            <div className="center" style={{ opacity: isLoading ? 1 : 0 }}>
              <Spinner size="large" />
            </div>
            <div style={{ opacity: isLoading ? 0 : 1, marginTop: -50 }}>
              {children}
            </div>
          </Page.Content>
        </Page>
      </ThemeContext.Provider>
    </GeistProvider>
  )
}

export default Layout
