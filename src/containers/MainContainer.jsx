import React from "react"

import HomeContainer from "./HomeContainer"
import HomeContentContainer from "./HomeContentContainer"
import MenuContainer from "./MenuContainer"

const MainContainer = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <HomeContentContainer />
      <MenuContainer />
    </div>
  )
}

export default MainContainer
