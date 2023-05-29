import React from "react"

const Heading = ({ title, className }) => {
  return (
    <p
      className={`before:content relative from-orange-400 to-orange-600 text-2xl font-semibold capitalize text-headingColor transition-all duration-100 ease-in-out before:absolute before:-bottom-2 before:left-0 before:h-1 before:rounded-lg before:bg-gradient-to-tr dark:text-primary ${className}`}
    >
      {title}
    </p>
  )
}

export default Heading
