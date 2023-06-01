import { Elements } from "@stripe/react-stripe-js"

import { useThemeValue } from "@/context"
import CheckoutForm from "./CheckoutForm"

function CheckoutPayment({ stripePromise, clientSecret, amount }) {
  const { isDark, _ } = useThemeValue()

  const appearance = {
    theme: isDark ? "stripe" : "night",
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
