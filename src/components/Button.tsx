import { ReactElement } from 'react'

type ButtonStyles = 'PRIMARY_CTA' | 'SECONDARY_CTA'

interface ButtonProps {
  children?: ReactElement
  innerText?: string
  onClick: ()=> void
  buttonStyle: ButtonStyles
}

function Button({buttonStyle, children, innerText, onClick}: ButtonProps) {
  const buttonInner = children || innerText
  const buttonClasses = getButtonStyle(buttonStyle)
  return (
    <button onClick={onClick} className={buttonClasses}>{buttonInner}</button>
  )
}

const getButtonStyle = (buttonStyle: ButtonStyles)=> {
  switch (buttonStyle) {
    case 'PRIMARY_CTA':
      return 'pointer-events-auto text-snowWhite py-2 px-3 bg-primary rounded-md font-semibold hover:bg-indigo-500 text-xs sm:text-sm lg:text-base'  
    default:
      break;
  }
}

export default Button