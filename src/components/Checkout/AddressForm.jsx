import { AddressElement, useElements } from "@stripe/react-stripe-js"
import React from "react"

const AddressForm = () => {
  const elements = useElements()

  const handleNextStep = async () => {
    const addressElement = elements.getElement("address")

    const { complete, value } = await addressElement.getValue()

    if (complete) {
      // Allow user to proceed to the next step
      // Optionally, use value to store the address details
    }
  }

  return (
    <form>
      <AddressElement
        options={{
          mode: "shipping",
          defaultValues: {
            name: "Jane Doe",
            address: {
              line1: "354 Oyster Point Blvd",
              line2: "",
              city: "South San Francisco",
              state: "CA",
              postal_code: "94080",
              country: "US",
            },
          },
        }}
        onChange={handleNextStep}
      />
    </form>
  )
}

export default AddressForm
