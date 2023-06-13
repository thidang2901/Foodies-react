import PropTypes from "prop-types"
import React from "react"

/**
 * A horizontal line with text in between
 *
 * @param className (optional)
 * @param centerText (optional)
 */
const HorizontalLine = ({ className, centerText }) => {
  return (
    <div className={`mt-3 flex w-full items-center ${className}`}>
      <hr className={`border-1 w-full flex-grow`} />
      {centerText && <div className="px-2 text-gray-400 dark:text-primary">{centerText}</div>}
      <hr className={`border-1 w-full flex-grow`} />
    </div>
  )
}

HorizontalLine.propTypes = {
  className: PropTypes.string,
  centerText: PropTypes.string,
}

export default HorizontalLine
