import React from "react"

import { Heading } from "@/components/shared"

const ContactSection = () => {
  return (
    <section className="my-3 h-full w-full md:scroll-mt-[100px]" id="contact">
      <div className="flex w-full flex-col items-center justify-center">
        <Heading title="Contact Us" className="before:left-5 before:w-24" />
      </div>
    </section>
  )
}

export default ContactSection
