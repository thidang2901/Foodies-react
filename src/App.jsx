import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { AnimatePresence } from "framer-motion"
import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import { Header } from "@/components/shared"
import {
  CheckoutContainer,
  CompletionContainer,
  CreateContainer,
  HomeContainer,
  NotFoundContainer,
} from "@/containers"
import { actionType, useStateValue } from "@/context"
import { getAllFoodItems } from "@/utils/firebaseFunctions"

import "./App.css"

function App() {
  const [_, dispatch] = useStateValue()
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [stripePromise, setStripePromise] = useState(null)
  useEffect(() => {
    axios
      .request("/config", {
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
      })
      .then(async (r) => {
        const { publishableKey } = await r.data
        setStripePromise(loadStripe(publishableKey))
      })
  }, [])

  return (
    <AnimatePresence mode="wait">
      <div className="flex min-h-full w-screen flex-col bg-white dark:bg-neutral-900">
        <Header />

        <main className="mt-14 w-full px-4 py-4 md:mt-20 md:px-16">
          <Routes>
            <Route exact path="/" element={<HomeContainer />} />
            <Route
              exact
              path="/checkout"
              element={<CheckoutContainer stripePromise={stripePromise} />}
            />
            <Route
              path="/completion"
              element={<CompletionContainer stripePromise={stripePromise} />}
            />
            <Route exact path="/admin/create-item" element={<CreateContainer />} />
            <Route path="/*" element={<NotFoundContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
