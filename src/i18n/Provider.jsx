import PropTypes from "prop-types"
import React, { Fragment, createContext, useContext, useState } from "react"
import { IntlProvider } from "react-intl"

import { LOCALES } from "./constants"
import messages from "./messages"

const I18nContext = createContext()

const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(navigator.language ?? LOCALES.ENGLISH)

  const selectLanguage = (lang) => setLocale(lang)

  return (
    <I18nContext.Provider value={{ locale, selectLanguage }}>
      <IntlProvider textComponent={Fragment} locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  )
}

I18nProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  locale: PropTypes.oneOf(Object.values(LOCALES)),
}

I18nProvider.defaultProps = {
  locale: LOCALES.ENGLISH,
}

const useI18nValue = () => useContext(I18nContext)

export { I18nProvider, useI18nValue }
