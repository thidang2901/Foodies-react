import { AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { Header } from "@/components"
import { CreateContainer, HomeContainer, NotFoundContainer } from "@/containers"
import { actionType, useStateValue } from "@/context"
import { getAllFoodItems } from "@/utils/firebaseFunctions"

import "./App.css"

function App() {
  const [{ foodItems }, dispatch] = useStateValue()

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
      <div className="w-screen min-h-full flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route exact path="/" element={<HomeContainer />} />
            <Route exact path="/menu" element={<HomeContainer />} />
            <Route exact path="/about-us" element={<HomeContainer />} />
            <Route exact path="/service" element={<HomeContainer />} />
            <Route exact path="/admin/create-item" element={<CreateContainer />} />
            <Route path="/*" element={<NotFoundContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
