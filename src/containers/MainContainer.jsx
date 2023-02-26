import React from "react"

import { CartContainer, HomeContainer, HomeContentContainer, MenuContainer } from "@containers"
import { useStateValue } from "@context"

const MainContainer = () => {
  const [{ cartShow }] = useStateValue()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <HomeContentContainer />

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  )
}

export default MainContainer
