import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"

import { useThemeValue } from "@/context"

const ThemeSwitcher = ({ label }) => {
  const { isDark, toggleTheme } = useThemeValue()

  return (
    <span className="flex items-center gap-3 w-full" onClick={toggleTheme}>
      {label ?? null}
      {isDark ? <FaMoon /> : <FaSun />}
    </span>
  )
}

export default ThemeSwitcher
