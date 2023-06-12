import React, { useEffect } from "react"
import { Link } from "react-router-dom"

import { actionType, useStateValue } from "@/context"

const EmptyCheckoutContainer = () => {
  const [_, dispatch] = useStateValue()

  useEffect(() => {
    dispatch({
      type: actionType.SET_ACTIVE_SCREEN,
      activeScreen: "checkout_empty",
    })
  }, [])

  return (
    <div className="my-4 flex min-h-[40rem] w-full flex-col items-center justify-center gap-y-10">
      <span className="flex justify-center text-5xl font-semibold text-orange-600 sm:text-7xl">
        OOPS!{" "}
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-textColor dark:text-white sm:text-5xl">
        Your cart is currently empty!
      </h1>
      <div className="mt-3 flex items-center justify-center gap-x-6">
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
