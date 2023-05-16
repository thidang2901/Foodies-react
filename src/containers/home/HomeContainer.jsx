import React, { useEffect, useRef } from "react"

import { CartContainer } from "@/containers"
import {
  AboutSection,
  ContactSection,
  HighlightSection,
  HeroSection,
  MenuSection,
} from "@/containers/home"
import { actionType, useStateValue } from "@/context"

const HomeContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue()
  const contentRef = useRef()
  
  useEffect(() => {
    dispatch({
      type: actionType.SET_ACTIVE_SCREEN,
      activeScreen: "home",
    })
  }, [])

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center md:scroll-mt-[100px]" id="home">
      <HeroSection contentRef={contentRef} />

      <HighlightSection ref={contentRef} />

      <MenuSection />

      <AboutSection />

      <ContactSection />

      {cartShow && <CartContainer />}
    </div>
  )
}

export default HomeContainer
