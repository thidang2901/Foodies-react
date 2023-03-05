import React, { forwardRef } from "react"

import { ContentSectionMenu, ContentSectionSlider } from "@/containers/home"

const ContentSection = forwardRef(({}, ref) => {
  return (
    <section ref={ref} id="home-content" className="w-full scroll-mt-[66px] md:scroll-mt-[88px]">
      <ContentSectionSlider />

      <ContentSectionMenu />
    </section>
  )
})

export default ContentSection
