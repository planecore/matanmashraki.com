module.exports = {
  async redirects() {
    return [
      {
        source: "/p/:path*",
        destination: "/portfolio/:path*",
        permanent: true,
      },
      { source: "/b/:path*", destination: "/blog/:path*", permanent: true },
    ]
  },
}
