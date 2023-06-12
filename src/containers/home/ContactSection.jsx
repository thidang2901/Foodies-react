import React from "react"

import { ContactForm } from "@/components/Contact"
import { Heading } from "@/components/shared"

const ContactSection = () => {
  return (
    <section
      className="h-full w-full bg-gradient-to-l from-orange-100/[.5] to-white py-6"
      id="contact"
    >
      <div className="flex w-full flex-col items-center justify-center">
        <Heading title="Contact Us" className="before:left-5 before:w-24" />
        <div className="flex w-full items-center justify-center mt-6">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
