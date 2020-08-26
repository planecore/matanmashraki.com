import { useState, useEffect } from "react"
const useAirtable = (table: string, limit?: number) => {
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const limitArg = limit ? `limit=${limit}` : undefined
    fetchData(table, limitArg).then((res) => setData(res.records))
  }, [table, limit])

  return {
    isLoading: data === undefined,
    data,
  }
}

const fetchData = (table: string, args?: string) =>
  fetch(
    `https://workers.matanmashraki.com/airtable/${table}${
      args ? `?${args}` : ""
    }`
  ).then((res) => res.json())

export default useAirtable
