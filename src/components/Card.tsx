import React, { ReactNode } from "react"

interface CardProps {
  className?: string
  children?: ReactNode
}

function Card({ className = "", children }: CardProps) {
  return <div className={`bg-white p-1 rounded ${className}`}>{children}</div>
}

export default Card
