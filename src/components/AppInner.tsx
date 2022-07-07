import { ReactElement } from 'react'

interface AppInnerProps {
  children?: ReactElement;
}

function AppInner({children}: AppInnerProps) {
  return (
    <div className='w-full flex-1 bg-snowWhite'>{children}</div>
  )
}

export default AppInner