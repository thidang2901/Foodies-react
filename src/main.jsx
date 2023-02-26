import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"

import App from "./App"

import { initialState, reducer, StateProvider } from "@context"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
)
