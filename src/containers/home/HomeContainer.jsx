import React from "react"

import { CartContainer } from "@/containers"
import { ContentSection, HeroSection, MenuSection } from "@/containers/home"
import { useStateValue } from "@/context"

const HomeContainer = () => {
  const [{ cartShow }] = useStateValue()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HeroSection />

      <ContentSection />

      <MenuSection />

      {cartShow && <CartContainer />}
    </div>
  )
}

export default HomeContainer
