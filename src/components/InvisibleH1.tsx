import React from "react"

// This component is used to add an H1 component to a page for SEO purposes but not have it display.

interface InvisibleH1Props {
  title: string
}

function InvisibleH1({ title }: InvisibleH1Props) {
  if (title.length > 70 || title.length < 20) {
    console.error(
      `title props passed to InvisibleH1 component should be between 20 and 70 characters for SEO. ${title} is ${title.length} characters.`
    )
  }
  return (
    <h1 className="block b-0 h-1 w-1 m-[-1] overflow-hidden p-0 absolute whitespace-nowrap">
      {title}
    </h1>
  )
}

export default InvisibleH1

/*
  .visually-hidden {
      display: block!important;
      border: 0!important;
      clip: rect(0 0 0 0)!important;
      height: 1px!important;
      margin: -1px!important;
      overflow: hidden!important;
      padding: 0!important;
      position: absolute!important;
      white-space: nowrap!important;
      width: 1px!important;
  }
*/
