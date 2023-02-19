import React from "react"
import HomeContainer from "./HomeContainer"
import HomeContentContainer from "./HomeContentContainer"

const MainContainer = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <HomeContentContainer />
    </div>
  )
}

export default MainContainer
