export type ContactBody = {
  subject: string
  name: string
  email: string
  message: string
}

export type ContactResponse = {
  success: boolean
  error?: Error
}

export type CompactResponse = {
  records?: [CompactRecord]
  error?: Error
}

export type PortfolioResponse = {
  records?: [PortfolioRecord]
  error?: Error
}

export type BlogResponse = {
  records?: [BlogRecord]
  error?: Error
}

export type CompactRecord = {
  id: string
  fields: CompactFields
  createdTime: string
}

export type PortfolioRecord = {
  id: string
  fields: CompactFields & PortfolioRecordFields
  createdTime: string
}

export type BlogRecord = {
  id: string
  fields: CompactFields & BlogRecordFields
  createdTime: string
}

type Error = {
  type: string
  message: string
}

type CompactFields = {
  Title: string
  Description: string
  Path: string
  Attachments: [Attachment]
  Date?: string
}

type PortfolioRecordFields = {
  Order: number
  Platform: string
  Content: string
  PrimaryButton: string
  SecondButton: string
}

type BlogRecordFields = {
  Order: number
  Content: string
}

type Attachment = {
  id: string
  url: string
  filename: string
  size: number
  type: string
  thumbnails: Thumbnails
}

type Thumbnails = {
  small: Thumbnail
  large: Thumbnail
  full: Thumbnail
}

type Thumbnail = {
  url: string
  width: number
  height: number
}
