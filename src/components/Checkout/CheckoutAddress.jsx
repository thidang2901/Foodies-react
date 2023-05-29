import { Elements } from "@stripe/react-stripe-js"

import AddressForm from "@/components/Checkout/AddressForm"

function CheckoutAddress({ stripePromise, clientSecret }) {
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
          <AddressForm />
        </Elements>
      )}
    </div>
  )
}

export default CheckoutAddress
