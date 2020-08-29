module.exports = {
  async rewrites() {
    return [
      { source: "/p/:path*", destination: "/portfolio/:path*" },
      { source: "/b/:path*", destination: "/blog/:path*" },
    ]
  },
}
