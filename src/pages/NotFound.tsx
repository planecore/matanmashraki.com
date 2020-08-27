import React from "react"
import createHead from "../support/createHead"

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {createHead("404")}
      <h2>404</h2>
      <h2>Not Found</h2>
    </div>
  )
}

export default NotFound
