import { getButtonStyle } from "./Button"

interface PillLinkProps {
  className?: string
  label: string
  url: string
}

function PillLink({ className = "", label, url }: PillLinkProps) {
  const openLink = () => {
    window.open(url, "_blank")
  }
  return (
    <a
      href={url}
      className={`${getButtonStyle("PILL")} ${className}`}
      target="_blank"
    >
      {label}
    </a>
  )
}

export default PillLink
