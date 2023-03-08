import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"

import { useThemeValue } from "@/context"

const ThemeSwitcher = ({ label }) => {
  const { isDark, toggleTheme } = useThemeValue()

  return (
    <div className="flex items-center gap-3" onClick={toggleTheme}>
      {label ?? null}
      {isDark ? <FaMoon /> : <FaSun />}
    </div>
  )
}

export default ThemeSwitcher
