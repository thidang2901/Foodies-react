import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"

import { StateProvider, ThemeProvider, initialState, reducer } from "@/context"
import { I18nProvider } from "@/i18n"

import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename="/">
      <StateProvider initialState={initialState} reducer={reducer}>
        <ThemeProvider>
          <I18nProvider>
            <App />
          </I18nProvider>
        </ThemeProvider>
      </StateProvider>
    </Router>
  </React.StrictMode>
)
