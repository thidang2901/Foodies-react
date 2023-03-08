import React, { useRef } from "react"

import { CartContainer } from "@/containers"
import { ContentSection, HeroSection } from "@/containers/home"
import { useStateValue } from "@/context"

const HomeContainer = () => {
  const [{ cartShow }] = useStateValue()
  const contentRef = useRef()

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center">
      <HeroSection contentRef={contentRef} />

      <ContentSection ref={contentRef} />

      {cartShow && <CartContainer />}
    </div>
  )
}

export default HomeContainer
