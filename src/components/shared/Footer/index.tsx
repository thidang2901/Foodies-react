import React from "react"
import { BiCopyright } from "react-icons/bi"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="flex items-center justify-center gap-6 border-t-[1px] py-4 text-3xl text-gray-400">
      <span className="flex items-center justify-center gap-2 text-lg">
        <BiCopyright /> 2023 Thi Dang
      </span>
      <Link to="https://github.com/thidang2901">
        <BsGithub />
      </Link>
      <Link to="https://linkedin.com/in/thidang2901">
        <BsLinkedin />
      </Link>
    </div>
  )
}

export default Footer
