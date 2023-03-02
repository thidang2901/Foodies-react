import { motion } from "framer-motion"
import React from "react"

const Modal = ({ children, shown, close }) => {
  return shown ? (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 bottom-0 left-0 right-0 bg-opacity-75 transition-opacity bg-gray-500 flex justify-center items-center z-10"
      onClick={() => close()}
    >
      <div
        className="p-5 min-h-[200px] bg-white rounded-lg text-left shadow-xl transition-all sm:w-full sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  ) : null
}

export default Modal
