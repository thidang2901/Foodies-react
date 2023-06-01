import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"

import { CheckoutPayment } from "@/components/Checkout"
import { CheckoutItemCard } from "@/components/Item"
import { actionType, useStateValue } from "@/context"
import { CHECKOUT_STEPS, DELIVERY_OPTIONS, PAYMENT_METHODS } from "@/utils/constants"

import AddressForm from "@/components/Checkout/AddressForm"
import { HourPicker } from "@/components/shared"
import Accordion from "@/components/shared/Accordion"
import EmptyCheckoutContainer from "./EmptyCheckoutContainer"

const CheckoutContainer = ({ stripePromise }) => {
  useEffect(() => {
    dispatch({
      type: actionType.SET_ACTIVE_SCREEN,
      activeScreen: "checkout",
    })
  }, [])

  // Stripe Payment
  const [clientSecret, setClientSecret] = useState("")
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .request("/create-payment-intent", {
        method: "POST",
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
        headers: { "Content-Type": "application/json" },
        data: { amount: total },
      })
      .then((res) => res.data)
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  // Checkout Steps
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.summary)
  const [expanded, setExpanded] = useState({})
  useEffect(() => {
    const updateExpand = {
      summary: false,
      delivery: false,
      payment: false,
    }

    updateExpand[currentStep] = true
    setExpanded(updateExpand)
  }, [currentStep])

  const navigate = useNavigate()

  const [{ cartItems }, dispatch] = useStateValue()
  const [pickupTime, setPickupTime] = useState(null)
  const [deliveryOption, setDeliveryOption] = useState(DELIVERY_OPTIONS[0].key)
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].key)

  const isEmptyCart = useMemo(() => {
    return !cartItems || Object.keys(cartItems).length === 0
  }, [cartItems])

  const totalItems = Object.keys(cartItems).reduce((prevTotal, curKey) => {
    prevTotal += cartItems[curKey].cartQty
    return prevTotal
  }, 0)

  const subTotal = Object.keys(cartItems).reduce((prevTotal, curKey) => {
    prevTotal += cartItems[curKey].cartQty * cartItems[curKey].price
    return prevTotal
  }, 0)

  const deliveryPrice = 2.5

  const VATPrice = subTotal * 0.08

  const total = useMemo(() => {
    let total = subTotal + VATPrice
    if (deliveryOption === "shipping") {
      total += deliveryPrice
    }
    return parseFloat(total).toFixed(2)
  }, [VATPrice, subTotal])

  const handleSubmitAddress = (e) => {
    setCurrentStep(CHECKOUT_STEPS.payment)

    dispatch({
      type: actionType.SET_CHECKOUT_TYPE,
      checkoutType: "shipping",
    })
  }

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      {!isEmptyCart && (
        <Link to="/#menu" className="flex w-full items-center gap-2">
          <MdOutlineKeyboardBackspace />
          Continue Shopping
        </Link>
      )}

      <div className="flex w-5/6 flex-col items-center justify-center gap-4 p-4 md:w-full">
        {isEmptyCart ? (
          <EmptyCheckoutContainer />
        ) : (
          <>
            <p className="my-3 mt-4 text-3xl font-bold uppercase tracking-tight text-textColor dark:text-white sm:text-5xl">
              Checkout your shopping cart
            </p>
            <div className="flex flex-col items-center justify-center gap-2 p-4 md:w-full">
              <div className="flex w-full flex-row items-start justify-between gap-2">
                <div className="flex flex-wrap items-center justify-start gap-2 p-4">
                  {Object.values(cartItems).map((item) => (
                    <CheckoutItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {!isEmptyCart && (
        <div className="flex w-4/5 flex-col items-center justify-center">
          <Accordion
            title="Order Summary"
            onClick={() => setCurrentStep(CHECKOUT_STEPS.summary)}
            expanded={expanded.summary}
          >
            <div className="flex flex-col items-start justify-start gap-2 rounded-md bg-orange-100 p-4">
              <p className="w-full text-xl font-semibold uppercase">Total {totalItems} item(s)</p>

              <div className="flex w-full justify-between">
                <p className="cart__content-checkout-subTotal">Subtotal</p>
                <p className="cart__content-checkout-subTotal">
                  ${parseFloat(subTotal).toFixed(2)}
                </p>
              </div>

              {deliveryOption === "shipping" && (
                <div className="flex w-full justify-between">
                  <p className="cart__content-checkout-subTotal">Delivery</p>
                  <p className="cart__content-checkout-subTotal">
                    ${parseFloat(deliveryPrice).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="flex w-full justify-between">
                <p className="cart__content-checkout-subTotal">VAT 8%</p>
                <p className="cart__content-checkout-subTotal">
                  ${parseFloat(VATPrice).toFixed(2)}
                </p>
              </div>

              <div className="my-2 w-full border-b border-gray-600"></div>

              <div className="flex w-full justify-between">
                <p className="cart__content-checkout-total">Total price</p>
                <p className="cart__content-checkout-total">${total}</p>
              </div>
            </div>
          </Accordion>

          <Accordion
            title="Delivery Option"
            onClick={() => setCurrentStep(CHECKOUT_STEPS.delivery)}
            expanded={expanded.delivery}
          >
            <div className="flex flex-col items-start justify-start gap-2 rounded-md bg-orange-100 p-4">
              <select
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
                className="w-[60%] cursor-pointer rounded-md border-b-2 border-gray-200 p-2 text-base outline-none"
              >
                {DELIVERY_OPTIONS &&
                  DELIVERY_OPTIONS.map((item) => (
                    <option
                      key={item.key}
                      value={item.key}
                      className="border-0 bg-white text-base text-headingColor outline-none"
                    >
                      {item.name}
                    </option>
                  ))}
              </select>

              {deliveryOption === "pickup" ? (
                <div className="flex w-full flex-col gap-2 py-4">
                  <p className="ml-3">- No more waiting and fast getting things ready.</p>
                  <p className="ml-3">- Open from 7:00am to 9:00pm every day.</p>
                  <div className="mt-3 flex w-full items-center justify-start">
                    <p>You will come at</p>{" "}
                    <div className="mx-3">
                      <HourPicker onChange={(h) => setPickupTime(h)} from="07" to="21" />
                    </div>
                    <p>and your order will be only kept at store within an hour!</p>
                  </div>
                </div>
              ) : (
                <div className="m-auto bg-white">
                  <div className="flex w-full items-center justify-center">
                    <AddressForm onSubmit={handleSubmitAddress} />
                  </div>
                </div>
              )}
            </div>
          </Accordion>

          <Accordion
            title="Proceed Payment"
            onClick={() => setCurrentStep(CHECKOUT_STEPS.payment)}
            expanded={expanded.payment}
          >
            <div className="flex flex-col items-start justify-start gap-2 rounded-md bg-orange-100 p-4">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full cursor-pointer rounded-md border-b-2 border-gray-200 p-2 text-base outline-none"
              >
                {PAYMENT_METHODS &&
                  PAYMENT_METHODS.map((item) => (
                    <option
                      key={item.key}
                      value={item.key}
                      className="border-0 bg-white text-base text-headingColor outline-none"
                    >
                      {item.name}
                    </option>
                  ))}
              </select>

              {paymentMethod === "card" ? (
                <CheckoutPayment
                  stripePromise={stripePromise}
                  clientSecret={clientSecret}
                  amount={total}
                />
              ) : (
                <div className="m-auto flex w-[40%] items-center justify-center">
                  <button
                    className="rounded-lg bg-orange-600 px-4 py-2 text-primary"
                    onClick={() => navigate("/completion")}
                  >
                    <span id="button-text">Proceed</span>
                  </button>
                </div>
              )}
            </div>
          </Accordion>
        </div>
      )}
    </section>
  )
}

export default CheckoutContainer
