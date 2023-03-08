import { motion } from "framer-motion"
import React from "react"

const Modal = ({ children, close }) => {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity"
      onClick={() => close()}
    >
      <div
        className="min-h-[200px] rounded-lg bg-white p-5 text-left shadow-xl transition-all dark:bg-neutral-900 sm:w-full sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default Modal
