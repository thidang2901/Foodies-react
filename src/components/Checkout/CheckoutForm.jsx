import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"

import { Spinner } from "@/components/shared"
import "./styles.css"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs",
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="bg-white">
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button
        className="rounded-lg bg-orange-600 px-4 py-2 text-primary"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">{isLoading ? <Spinner /> : "Pay now"}</span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
