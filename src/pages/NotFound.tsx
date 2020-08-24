import React, { useEffect } from "react"

const NotFound = () => {
  useEffect(() => {
    document.title = "Matan Mashraki | 404"
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>404</h2>
      <h2>Not Found</h2>
    </div>
  )
}

export default NotFound
