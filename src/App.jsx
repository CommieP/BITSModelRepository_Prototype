import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux'
import store from './packages/store'
import RoutesHOC from './packages/routes'
import NavBar from './packages/NavBar'

function App() {
  return (
    <>
      <Provider store={store}>
        <RoutesHOC></RoutesHOC>
      </Provider>
    </>
  )
}

export default App
