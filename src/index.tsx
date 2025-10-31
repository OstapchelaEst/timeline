import React from 'react'
import ReactDOM from 'react-dom/client'
import { TimeLine } from './components/timeline'

import './styles/global.scss'
import './styles/variables.scss'
import 'swiper/css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <TimeLine />
  </React.StrictMode>
)
