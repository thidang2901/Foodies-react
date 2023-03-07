import React, { createContext, useContext, useState } from "react"

import { useTheme } from "@/hooks"

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [colorTheme, setTheme] = useTheme()
  const [darkSide, setDarkSide] = useState(colorTheme === "light")

  const toggleTheme = () => {
    setTheme(colorTheme)
    setDarkSide((prev) => !prev)
  }

  return <ThemeContext.Provider value={{ isDark: darkSide, toggleTheme }}>{children}</ThemeContext.Provider>
}

const useThemeValue = () => useContext(ThemeContext)

export { ThemeProvider, useThemeValue }
