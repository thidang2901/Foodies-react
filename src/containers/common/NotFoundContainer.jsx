import React, { useEffect } from "react"
import { Link } from "react-router-dom"

import { actionType, useStateValue } from "@/context"

const NotFoundContainer = () => {
  const [_, dispatch] = useStateValue()

  useEffect(() => {
    dispatch({
      type: actionType.SET_ACTIVE_SCREEN,
      activeScreen: "notfound",
    })
  }, [])

  return (
    <section className="grid h-90vh place-items-center py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-5xl font-semibold text-orange-600 sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-textColor dark:text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-primary">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-orange-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundContainer
