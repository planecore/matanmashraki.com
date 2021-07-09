const fetchAge = () => {
  return fetch("https://age.matan.workers.dev").then((res) => res.text())
}

export default fetchAge
