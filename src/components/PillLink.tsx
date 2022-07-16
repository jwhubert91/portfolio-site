import { getButtonStyle } from "./Button"

interface PillLinkProps {
  className?: string
  label: string
  url: string
  type?: "LIGHT" | "DARK"
}

function PillLink({
  className = "",
  label,
  url,
  type = "DARK",
}: PillLinkProps) {
  return (
    <a
      href={url}
      className={`${getButtonStyle(
        type === "DARK" ? "PILL" : "PILL_LIGHT"
      )} ${className}`}
      target="_blank"
    >
      {label}
    </a>
  )
}

export default PillLink
