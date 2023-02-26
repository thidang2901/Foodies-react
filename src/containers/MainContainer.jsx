import React from "react"

import { useStateValue } from "../context/StateProvider"
import CartContainer from "./CartContainer"
import HomeContainer from "./HomeContainer"
import HomeContentContainer from "./HomeContentContainer"
import MenuContainer from "./MenuContainer"

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
