import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"

import { useThemeValue } from "@/context"

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useThemeValue()

  return <span onClick={toggleTheme}>{isDark ? <FaMoon /> : <FaSun />}</span>
}

export default ThemeSwitcher
