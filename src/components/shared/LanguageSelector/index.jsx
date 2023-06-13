import { US, VN } from "country-flag-icons/react/3x2"
import React, { useCallback } from "react"

import { LOCALES, useI18nValue } from "@/i18n"

const LanguageSelector = () => {
  const { locale, selectLanguage } = useI18nValue()

  const getFlag = useCallback(() => {
    switch (locale) {
      case LOCALES.VIETNAMESE: {
        return <VN className="w-6" />
      }
      default: {
        return <US className="w-6" />
      }
    }
  }, [locale])

  return (
    <div className="flex border-gray-300">
      {getFlag()}
      <select
        value={locale}
        onChange={(e) => selectLanguage(e.target.value)}
        className="w-full cursor-pointer rounded-md border-gray-200 p-2 text-base outline-none"
      >
        <option
          className="border-0 bg-white text-base text-headingColor outline-none"
          value={LOCALES.ENGLISH}
        >
          English
        </option>
        <option
          className="border-0 bg-white text-base text-headingColor outline-none"
          value={LOCALES.VIETNAMESE}
        >
          Tiếng Việt
        </option>
      </select>
    </div>
  )
}

export default LanguageSelector
