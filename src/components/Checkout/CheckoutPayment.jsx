import { Elements } from "@stripe/react-stripe-js"
import axios from "axios"
import { useEffect, useState } from "react"

import CheckoutForm from "./CheckoutForm"

function CheckoutPayment({ stripePromise, clientSecret, amount }) {

  const appearance = {
    theme: "stripe",
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="flex w-full items-center justify-center">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default CheckoutPayment
