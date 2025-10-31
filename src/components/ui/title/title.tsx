import { PropsWithChildren } from 'react'
import './title.scss'

export const Title = ({ children }: PropsWithChildren) => {
  return <h1 className="title">{children}</h1>
}
