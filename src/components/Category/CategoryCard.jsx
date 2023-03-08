import { motion } from "framer-motion"
import React from "react"
import { IoFastFood } from "react-icons/io5"

const CategoryCard = ({ data, isActive, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.75 }}
      className={`group ${
        isActive ? "bg-cartNumBg" : "bg-white dark:bg-gray-200"
      } flex h-28 w-24 min-w-[94px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg drop-shadow-xl hover:bg-cartNumBg dark:hover:bg-cartNumBg`}
      onClick={onClick}
    >
      <div
        className={`h-10 w-10 rounded-full shadow-lg ${
          isActive ? "bg-white" : "bg-cartNumBg"
        } flex items-center justify-center group-hover:bg-white`}
      >
        <IoFastFood
          className={`${
            isActive ? "text-textColor" : "text-white"
          } text-lg group-hover:text-textColor`}
        />
      </div>
      <p
        className={`text-sm ${
          isActive ? "text-white" : "text-textColor"
        }  select-none group-hover:text-white`}
      >
        {data.name}
      </p>
    </motion.div>
  )
}

export default CategoryCard
