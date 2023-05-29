import React, { useEffect, useState } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { Link } from "react-router-dom"

import { actionType, useStateValue } from "@/context"

const CompletionContainer = ({ stripePromise }) => {
  const [_, dispatch] = useStateValue()

  useEffect(() => {
    dispatch({
      type: actionType.SET_ACTIVE_SCREEN,
      activeScreen: "checkout_completion",
    })
  }, [])

  const [messageBody, setMessageBody] = useState("")

  useEffect(() => {
    if (!stripePromise) return

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location)
      const clientSecret = url.searchParams.get("payment_intent_client_secret")
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{" "}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {paymentIntent.id}
            </a>
          </>
        )
      )
    })
  }, [stripePromise])

  return (
    <section className="grid h-90vh place-items-center py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <span className="flex justify-center text-5xl font-semibold text-orange-600 sm:text-7xl">
          Payment successful <span className='ml-5'><FiCheckCircle /></span>
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-textColor dark:text-white sm:text-5xl">
          Thank you for choosing us!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-primary">
          The order receipt has been sent to your email. (Order code: A0001)
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-orange-600"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CompletionContainer
