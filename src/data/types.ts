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
  Cover: string
  Date?: string
}

type PortfolioRecordFields = {
  Order: number
  Content: string
  Platform: string
  PrimaryButton: string
  SecondButton: string
}

type BlogRecordFields = {
  Order: number
  Content: string
}
