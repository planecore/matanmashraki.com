const fetchAirtable = (
  table: string,
  path?: string,
  limit?: number,
  compact: boolean = false
) => {
  const limitArg = limit ? `limit=${limit}` : ""
  const pathArg = path ? `path=${path}` : ""
  const compactArg = compact ? `compact` : ""
  const args = `${limitArg}&${pathArg}&${compactArg}`
  return fetchData(table, args)
}

const fetchData = (table: string, args: string) =>
  fetch(
    `https://workers.matanmashraki.com/airtable/${table}?${args}`
  ).then((res) => res.json())

export default fetchAirtable
