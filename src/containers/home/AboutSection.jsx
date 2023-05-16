import React from "react"

import { Heading } from "@/components/shared"

const AboutSection = () => {
  return (
    <section className="my-3 h-full w-full md:scroll-mt-[100px]" id="about">
      <div className="flex w-full flex-col items-center justify-center">
        <Heading title="About Us" className="before:left-6 before:w-16" />
      </div>
    </section>
  )
}

export default AboutSection
