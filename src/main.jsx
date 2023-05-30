import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter as Router } from "react-router-dom"

import { initialState, reducer, StateProvider, ThemeProvider } from "@/context"

import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename="/foodies-app">
      <StateProvider initialState={initialState} reducer={reducer}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StateProvider>
    </Router>
  </React.StrictMode>
)
