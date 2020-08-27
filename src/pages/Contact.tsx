import React, { useEffect, useRef, FormEvent, useState } from "react"
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
import createHead from "../support/createHead"

const Contact = () => {
  const { type } = useTheme()
  const [, setToast] = useToasts()
  const form = useRef<HTMLFormElement>(null)
  const name = useInput("")
  const email = useInput("")
  const subject = useInput("")
  const message = useInput("")
  const [captcha, setCaptcha] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const [loading, setLoading] = useState(false)

  const onReCAPTCHAChange = (token: string | null) => {
    setCaptcha(token)
  }

  const onReCAPTCHAExpired = () => {
    setCaptcha(null)
    setToast({
      text:
        "ReCAPTCHA verification expired. You'll need to reverify again that you're not a bot",
      type: "warning",
    })
  }

  useEffect(() => {
    if (!form.current) return
    ;[...form.current.querySelectorAll("div > span")].forEach(
      (item: any) => (item.style.width = "115px")
    )
  }, [form])

  const validateEmail = (email: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase())

  const handleResponse = (json: any) => {
    setLoading(false)
    recaptchaRef.current?.reset()
    if (json && !!json.success && json.success === true) {
      name.setState("")
      email.setState("")
      subject.setState("")
      message.setState("")
      setToast({
        text: "Your message has been sent!",
        type: "success",
      })
    } else {
      setToast({
        text: json?.error?.message ?? "Unknown error occurred.",
        type: "error",
      })
    }
  }

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()
    if (!captcha) {
      setToast({ text: "Please verify that you're not a bot." })
      return
    }
    if (!validateEmail(email.state)) {
      setToast({ text: "The email you provided is not valid.", type: "error" })
      return
    }
    if (
      subject.state === "" ||
      name.state === "" ||
      email.state === "" ||
      message.state === ""
    ) {
      setToast({ text: "Please fill all the fields.", type: "error" })
      return
    }
    setLoading(true)
    fetch("https://workers.matanmashraki.com/contact", {
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
      .catch((err) => handleResponse(null))
  }

  return (
    <form
      ref={form}
      onSubmit={sendMessage}
      style={{ marginTop: 40, textAlign: "center" }}
    >
      {createHead("Contact")}
      <Spacer y={0.5} />
      <Input label="Name" width="100%" {...name.bindings} />
      <Spacer y={0.5} />
      <Input label="Email Address" width="100%" {...email.bindings} />
      <Spacer y={0.5} />
      <Input label="Subject" width="100%" {...subject.bindings} />
      <Spacer y={0.5} />
      <Textarea
        placeholder="Message"
        width="100%"
        minHeight="200px"
        {...message.bindings}
      />
      <Spacer y={0.5} />
      <Row justify="center" style={{ height: 78 }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LcZksIZAAAAADcDCXHnj67_pB_AWpqEWJv5FCyW"
          onChange={onReCAPTCHAChange}
          onExpired={onReCAPTCHAExpired}
          theme={type}
        />
      </Row>
      <Spacer y={0.5} />
      <Button
        loading={loading}
        shadow
        type="secondary"
        htmlType="submit"
        style={{ width: 304 }}
      >
        Submit
      </Button>
    </form>
  )
}

export default Contact
