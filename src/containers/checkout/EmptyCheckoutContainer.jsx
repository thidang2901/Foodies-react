import { motion } from "framer-motion"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { actionType, useStateValue } from "@/context"

const EmptyCheckoutContainer = () => {
  const navigate = useNavigate()
  const [_, dispatch] = useStateValue()

  useEffect(() => {
    dispatch({
      type: actionType.SET_ACTIVE_SCREEN,
      activeScreen: "checkout_empty",
    })
  }, [])

  return (
    <div className="mt-8  flex h-[60vh] w-full flex-col items-center justify-center gap-4">
      <p className="my-2 text-xl font-semibold text-headingColor dark:text-primary">
        Your cart is currently empty!
      </p>

      <motion.button
        whileTap={{ scale: 0.8 }}
        type="button"
        className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-primary"
        onClick={() => navigate("/")}
      >
        Back to Shopping
      </motion.button>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-orange-600"
        >
          Back to Shopping
        </Link>
      </div>
    </div>
  )
}

export default EmptyCheckoutContainer
