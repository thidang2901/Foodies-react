import React from "react"
import { Link } from "react-router-dom"

const NotFoundContainer = () => {
  return (
    <main class="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-5xl sm:text-9xl font-semibold text-orange-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-textColor sm:text-5xl">Page not found</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            class="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundContainer
