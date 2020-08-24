import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { GeistProvider, CssBaseline } from "@geist-ui/react"

export type ThemeContextType = {
  theme: "light" | "dark"
  setThemeMode: (value: "auto" | "light" | "dark") => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  setThemeMode: (val) => console.log(val),
})

const Index = () => {
  const [options, setOptions] = useState<"auto" | "light" | "dark">(
    getSelectedTheme()
  )
  const [theme, setTheme] = useState<"light" | "dark">(getCurrentTheme())

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
        <App />
      </ThemeContext.Provider>
    </GeistProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
