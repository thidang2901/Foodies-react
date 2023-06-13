import React from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

const Accordion = ({
  title,
  children,
  onClick,
  expanded = false,
  openIcon = <BsChevronDown />,
  closeIcon = <BsChevronUp />,
}) => {
  return (
    <div
      className="mt-2 w-full cursor-default rounded-md border-2 border-orange-600 bg-white shadow-sm sm:mt-4 md:mt-6"
      onClick={onClick}
    >
      <div className="flex h-20 cursor-pointer select-none flex-row items-center justify-between px-6 text-left">
        <h5 className="flex-1 text-xl font-semibold uppercase">{title}</h5>
        <div className="flex-none pl-2">{expanded ? closeIcon : openIcon}</div>
      </div>
      <div
        className={`overflow-hidden px-6 pt-0 transition-all duration-300 ease-in-out ${
          expanded ? "max-h-[50rem]" : "max-h-0"
        }`}
      >
        <div className="pb-4 text-left">{children}</div>
      </div>
    </div>
  )
}

export default Accordion
