import React from "react"

const Heading = ({ title, className }) => {
  return (
    <p
      className={`text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 ${className}`}
    >
      {title}
    </p>
  )
}

export default Heading
