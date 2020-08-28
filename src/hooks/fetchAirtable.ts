const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY

export default (
  table: string,
  path?: string,
  limit?: number,
  compact: boolean = false
) => {
  const limitArg = limit ? `&maxRecords=${limit}` : ""
  const pathArg = path ? `&filterByFormula={Path} = '${path}'` : ""
  const compactArg = compact
    ? `&fields[]=Title&fields[]=Description&fields[]=Attachments&fields[]=Path`
    : ""
  if (table === "" || (table !== "Portfolio" && table !== "Blog")) {
    return {
      error: {
        type: "TABLE_NOT_FOUND",
        message: "Could not find table in application",
      },
    }
  }
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}?sort[0][field]=Order&sort[0][direction]=asc${limitArg}${pathArg}${compactArg}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => ({
      error: {
        type: "JSON_NOT_DECODED",
        message: "Could not decode response from Airtable",
      },
    }))
}
