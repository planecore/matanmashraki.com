import { CompactRecord } from "./types"

const getImageFor = (record: CompactRecord) =>
  record.fields.Attachments.find((elem) => elem.filename === "Cover.webp")

export default getImageFor
