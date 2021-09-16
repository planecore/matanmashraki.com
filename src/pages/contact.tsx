import { useEffect, useRef, FormEvent, useState } from "react"
import {
  Input,
  Spacer,
  useInput,
  Textarea,
  Button,
  useToasts,
  Row,
  useTheme,
} from "@geist-ui/react"
import ReCAPTCHA from "react-google-recaptcha"
import { NextPage } from "next"
import Head from "../components/layout/Head"
import { ContactResponse } from "../data/types"

const ContactPage: NextPage = () => {
  // current theme
  const { type } = useTheme()
  // used to show response from the server
  const [, setToast] = useToasts()
  // used to change some elements sizes in the form
  const form = useRef<HTMLFormElement>(null)

  // form inputs
  const name = useInput("")
  const email = useInput("")
  const subject = useInput("")
  const message = useInput("")

  // captcha state
  const [captcha, setCaptcha] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  // true while sending a request to the server
  // and waiting for response
  const [loading, setLoading] = useState(false)

  const onReCAPTCHAChange = (token: string | null) => {
    setCaptcha(token)
  }

  const onReCAPTCHAExpired = () => {
    setCaptcha(null)
    setToast({
      text: "ReCAPTCHA verification expired. You'll need to reverify again that you're not a bot",
      type: "warning",
    })
  }

  // changes some elements sizes
  useEffect(() => {
    if (!form.current) return
    ;[...form.current.querySelectorAll("div > span")].forEach((item: any) => {
      item.style.width = "125px"
      item.style.fontSize = "16px"
    })
    ;[...form.current.querySelectorAll("div > input")].forEach(
      (item: any) => (item.style.fontSize = "16px")
    )
    ;[...form.current.querySelectorAll("div > textarea")].forEach(
      (item: any) => (item.style.fontSize = "16px")
    )
  }, [form])

  /**
   * Validates if the input is an email address
   * @param input email address to test
   */
  const validateEmail = (input: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.toLowerCase())

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()
    // check captcha
    if (!captcha) {
      setToast({ text: "Please verify you're not a bot." })
      return
    }
    // check if email is valid
    if (!validateEmail(email.state)) {
      setToast({ text: "The email you provided is not valid.", type: "error" })
      return
    }
    // check if user filled the whole form
    if (subject.state === "" || name.state === "" || email.state === "" || message.state === "") {
      setToast({ text: "Please fill all the fields.", type: "error" })
      return
    }
    // send request to the API
    setLoading(true)
    const baseURL = `${window.location.protocol}//${window.location.host}`
    fetch(`${baseURL}/api/contact`, {
      method: "POST",
      headers: {
        ReCAPTCHA: captcha,
      },
      body: JSON.stringify({
        subject: subject.state,
        name: name.state,
        email: email.state,
        message: message.state,
      }),
    })
      .then((res) => res.json())
      .then((json) => handleResponse(json))
      .catch(() =>
        handleResponse({
          success: false,
          error: {
            type: "UNKNOWN_ERROR",
            message: "Unknown error occurred.",
          },
        })
      )
  }

  const handleResponse = (res: ContactResponse) => {
    // reset captcha
    setLoading(false)
    setCaptcha(null)
    recaptchaRef.current?.reset()
    if (res.success) {
      // if the message was sent successfully,
      // clean the form
      name.setState("")
      email.setState("")
      subject.setState("")
      message.setState("")
      setToast({
        text: "Your message has been sent!",
        type: "success",
      })
    } else {
      // show an error on fail
      setToast({
        text: res.error?.message ?? "Unknown error occurred.",
        type: "error",
      })
    }
  }

  return (
    <div>
      <Head title="Contact" />
      <form
        ref={form}
        onSubmit={sendMessage}
        style={{ marginTop: 40, textAlign: "center", fontSize: 16 }}
      >
        <Spacer y={0.5} />
        <Input label="Name" width="100%" {...name.bindings} />
        <Spacer y={0.5} />
        <Input label="Email Address" type="email" width="100%" {...email.bindings} />
        <Spacer y={0.5} />
        <Input label="Subject" width="100%" {...subject.bindings} />
        <Spacer y={0.5} />
        <Textarea placeholder="Message" width="100%" minHeight="200px" {...message.bindings} />
        <Spacer y={0.5} />
        <Row justify="center" style={{ height: 78 }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_ReCAPTCHA_KEY}
            onChange={onReCAPTCHAChange}
            onExpired={onReCAPTCHAExpired}
            theme={type}
          />
        </Row>
        <Spacer y={0.5} />
        <Button loading={loading} shadow type="secondary" htmlType="submit" style={{ width: 304 }}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ContactPage
