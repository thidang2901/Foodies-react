import React from "react"
import { IoFastFood } from "react-icons/io5"
import { motion } from "framer-motion"

const CategoryCard = ({ data, isActive, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.75 }}
      className={`group ${
        isActive ? "bg-cartNumBg" : "bg-white"
      } hover:bg-cartNumBg w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center`}
      onClick={onClick}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-lg ${
          isActive ? "bg-white" : "bg-cartNumBg"
        } group-hover:bg-white flex items-center justify-center`}
      >
        <IoFastFood
          className={`${
            isActive ? "text-textColor" : "text-white"
          } group-hover:text-textColor text-lg`}
        />
      </div>
      <p
        className={`text-sm ${
          isActive ? "text-white" : "text-textColor"
        }  group-hover:text-white select-none`}
      >
        {data.name}
      </p>
    </motion.div>
  )
}

export default CategoryCard
