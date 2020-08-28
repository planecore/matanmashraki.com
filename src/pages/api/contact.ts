import { NextApiRequest, NextApiResponse } from "next"
import FormData from "form-data"

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const ReCAPTCHA_SECRET = process.env.ReCAPTCHA_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.url) return
  if (req.method !== "POST") {
    return res.status(400).end(
      JSON.stringify({
        success: false,
        error: {
          type: "ONLY_POST_ALLOWED",
          message: "This endpoint accepts only POST requests.",
        },
      })
    )
  }
  const token = req.headers["recaptcha"]
  if (!token) {
    return res.status(400).end(
      JSON.stringify({
        success: false,
        error: {
          type: "NO_TOKEN_PROVIDED",
          message: "No token provided from ReCAPTHCA.",
        },
      })
    )
  }
  const captcha = await verifyReCAPTCHA(token as string)
  if (!captcha) {
    return res.status(401).end(
      JSON.stringify({
        success: false,
        error: {
          type: "ReCAPTCHA_ERROR",
          message: "ReCAPTHCA indicated that you might be a bot.",
        },
      })
    )
  }
  const json = JSON.parse(req.body)
  if (json && json.subject && json.name && json.email && json.message) {
    return await fillAirtable(json, res)
  } else {
    return res.status(400).end(
      JSON.stringify({
        success: false,
        error: {
          type: "MISSING_DATA",
          message: "Some data in the request body is missing.",
        },
      })
    )
  }
}

async function fillAirtable(data: any, res: NextApiResponse) {
  return fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Contact`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Subject: data.subject,
            Name: data.name,
            "Email Address": data.email,
            Message: data.message,
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then(() =>
      res.status(200).end(
        JSON.stringify({
          success: true,
        })
      )
    )
    .catch(() =>
      res.status(500).end(
        JSON.stringify({
          success: false,
          error: {
            type: "JSON_NOT_DECODED",
            message: "Could not decode response from Airtable",
          },
        })
      )
    )
}

async function verifyReCAPTCHA(response: string) {
  const data = new FormData()
  data.append("secret", ReCAPTCHA_SECRET)
  data.append("response", response)

  return fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: data as any,
  })
    .then((req) => req.json())
    .then((res) => res.success)
    .catch(() => false)
}
