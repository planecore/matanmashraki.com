import * as NextLink from "next/link"
import { CSSProperties } from "react"

type LinkProps = {
  href: string
  as?: string
  style?: CSSProperties
  children: JSX.Element | [JSX.Element]
}

const Link = ({ href, as, style, children }: LinkProps) => (
  <div style={{ cursor: "pointer", ...style }}>
    <NextLink.default as={as} href={href}>
      {children}
    </NextLink.default>
  </div>
)

export default Link
