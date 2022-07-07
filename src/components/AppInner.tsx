import { ReactElement } from 'react'

interface AppInnerProps {
  children?: ReactElement;
}

function AppInner({children}: AppInnerProps) {
  return (
    <main className='w-full flex-1 flex flex-col bg-snowWhite'>{children}</main>
  )
}

export default AppInner