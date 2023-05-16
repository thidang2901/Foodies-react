import React, { forwardRef } from "react"

import { ContentSectionSlider } from "@/containers/home"

const HighlightSection = forwardRef(({}, ref) => {
  return (
    <section
      ref={ref}
      id="highlight"
      className="w-full scroll-mt-[66px] md:scroll-mt-[88px]"
    >
      <ContentSectionSlider />
    </section>
  )
})

export default HighlightSection
