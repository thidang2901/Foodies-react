import React from "react"

import { Heading } from "@/components/shared"

const AboutSection = () => {
  return (
    <section
      className="h-full w-full bg-gradient-to-r from-orange-100/[.5] to-white py-6 md:scroll-mt-[100px]"
      id="about"
    >
      <div className="flex w-full flex-col items-center justify-center">
        <Heading title="About Us" className="before:left-6 before:w-16" />

        <div className="mt-6 flex w-full items-center justify-center gap-5 lg:w-4/5">
          <div className="flex-auto">
            <div className="flex flex-col gap-2 text-justify leading-loose">
              <p>
                Hi there! I'm <span className="font-semibold text-orange-500">Thi</span> (/tɪ/), a
                friendly and enthusiastic web developer who loves transforming ideas into
                captivating online experiences.
              </p>
              <p>
                Get to know me better at{" "}
                <a
                  className="text-orange-400 underline underline-offset-2"
                  href="https://thidang2901.github.io"
                >
                  here
                </a>
                , where I showcase my portfolio to explore my coding adventures, and connect with
                me.
              </p>
              <p>Let's create incredible websites and make the internet a better place together!</p>
            </div>
          </div>
          <div className="min-w-[150px] max-w-[220px] flex-auto">
            <img
              src="/src/assets/images/about-us/Thi-DL-2022-2.JPEG"
              className="h-full w-full object-cover"
              alt="Thi-avatar"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
