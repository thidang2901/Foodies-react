import { motion } from "framer-motion"
import React from "react"
import { BsGoogle } from "react-icons/bs"

import { useFirebaseAuth } from "@/hooks"

const ExternalSignIn = ({ onSubmit }) => {
  const { handleGoogleSignIn } = useFirebaseAuth()

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      type="button"
      className="my-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 px-12 py-2 hover:shadow-lg dark:hover:bg-gray-50 md:w-auto"
      onClick={() => handleGoogleSignIn(onSubmit)}
    >
      <BsGoogle />
      <span className="text-base text-textColor">Continue with Google</span>
    </motion.button>
  )
}

export default ExternalSignIn
