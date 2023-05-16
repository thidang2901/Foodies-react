import { AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { Header } from "@/components/shared"
import { CreateContainer, HomeContainer, NotFoundContainer } from "@/containers"
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

  return (
    <AnimatePresence mode="wait">
      <div className="flex min-h-full w-screen flex-col bg-white dark:bg-neutral-900">
        <Header />

        <main className="mt-14 w-full px-4 py-4 md:mt-20 md:px-16">
          <Routes>
            <Route exact path="/" element={<HomeContainer />} />
            <Route exact path="/admin/create-item" element={<CreateContainer />} />
            <Route path="/*" element={<NotFoundContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
