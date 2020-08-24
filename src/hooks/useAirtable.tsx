import { useState, useEffect } from "react"

const useAirtable = (table: string) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    fetchData(table).then((res) => setData(res.records))
  }, [table])

  return {
    isLoading: data === undefined,
    data,
  }
}

const fetchData = (table: string) =>
  fetch(`https://workers.matanmashraki.com/airtable/${table}`).then((res) =>
    res.json()
  )

export default useAirtable
