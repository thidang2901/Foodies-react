import React from "react"

import { CartContainer, HeroContainer, HomeContentContainer, MenuContainer } from "@containers"
import { useStateValue } from "@context"

const MainContainer = () => {
  const [{ cartShow }] = useStateValue()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HeroContainer />

      <HomeContentContainer />

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  )
}

export default MainContainer
