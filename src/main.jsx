import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { ReactTogether } from 'react-together';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ReactTogether
    sessionParams={{
      appId: 'com.gmail.lukashliliana.microverse',    // Замените на ваш appId
      apiKey: '1rJF6GBptzKoxylK9aMEKsJxlF6a9iAvCB434p27a',  // Замените на ваш apiKey
    }}
  >
        <App />
      </ReactTogether>
  </StrictMode>,
)
