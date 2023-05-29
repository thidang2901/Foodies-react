import React, { createContext, useContext, useState } from "react"

import { useTheme } from "@/hooks"

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [colorTheme, setTheme] = useTheme()
  const [isDark, setDarkSide] = useState(colorTheme === "dark")

  const toggleTheme = () => {
    setTheme(colorTheme)
    setDarkSide((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useThemeValue = () => useContext(ThemeContext)

export { ThemeProvider, useThemeValue }
