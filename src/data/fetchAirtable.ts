const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY

type Table = "Portfolio" | "Blog"

/**
 * Gets data from Airtable
 * @param table Table to get all data from
 * @param path Used in order to get a specific record from a table, based on the Path field
 * @param limit Get only n records from the table
 * @param compact Get only the preview of a record without its content
 */
export default (
  table: Table,
  path?: string,
  limit?: number,
  compact: boolean = false
) => {
  // convert parameters to Airtable API query
  const limitArg = limit ? `&maxRecords=${limit}` : ""
  const pathArg = path ? `&filterByFormula={Path} = '${path}'` : ""
  const compactArg = compact
    ? `&fields[]=Title&fields[]=Description&fields[]=Cover&fields[]=Path${
        table === "Blog" ? "&fields[]=Date" : ""
      }`
    : ""
  // check if the table is accessible before the request is made
  if (table !== "Portfolio" && table !== "Blog") {
    return {
      error: {
        type: "TABLE_NOT_FOUND",
        message: "Could not find table in application",
      },
    }
  }
  // return data from Airtable
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}?sort[0][field]=Order&sort[0][direction]=asc${limitArg}${pathArg}${compactArg}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  )
    .then((response) => response.json())
    .catch(() => ({
      error: {
        type: "JSON_NOT_DECODED",
        message: "Could not decode response from Airtable",
      },
    }))
}
