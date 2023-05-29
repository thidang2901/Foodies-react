import { motion } from "framer-motion"
import React from "react"

import { heroData } from "@/utils/data"

import Delivery from "@/assets/images/delivery.png"
import HeroBg from "@/assets/images/heroBg.png"

const HeroSection = ({ contentRef }) => {
  return (
    <section
      id="hero"
      className="grid h-auto w-full grid-cols-1 gap-2 md:h-screen md:grid-cols-2"
    >
      <div className="flex min-w-350 flex-1 flex-col items-start justify-center gap-6">
        <div className="flex flex-row items-center justify-center gap-2 rounded-full bg-orange-100 px-4 py-1 dark:bg-orange-500">
          <p className="text-base font-semibold text-orange-500 dark:text-orange-100">
            Bike Delivery
          </p>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-white drop-shadow-xl dark:bg-neutral-900">
            <img
              src={Delivery}
              className="h-full w-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[1.5rem] font-bold tracking-wide text-headingColor dark:text-white md:max-w-2xl md:text-[3rem]">
          <span className="text-[2rem] text-orange-600 md:text-[4rem]">
            Foodies
          </span>
          <br />
          Deliver happiness to your door
        </p>

        <p className="text-center text-base text-textColor dark:text-primary md:w-[80%] md:text-left">
          Craving something tasty? Our all-in-one service that has everything
          you need to satisfy your hunger and thirst. Browse our selection of
          mouth-watering fast food, hearty rice dishes, juicy fruits, and cold
          soft drinks and have your meal delivered to your doorstep.
        </p>

        <motion.button
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          type="button"
          className="w-full rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 px-4 py-2 text-white transition-all duration-100 ease-in-out hover:shadow-lg md:w-auto"
          onClick={() => contentRef.current.scrollIntoView()}
        >
          Order Now
        </motion.button>
      </div>

      <div className="relative flex min-w-[150px] flex-1 items-center">
        <img
          src={HeroBg}
          className="ml-auto h-420 w-full lg:h-650 lg:w-auto"
          alt="hero-bg"
        />
        <div className="absolute top-0 left-0 flex h-full w-full flex-wrap items-center justify-center gap-4 px-0 py-4 sm:px-32 md:px-0 lg:px-0 xl:px-14 2xl:px-36 3xl:px-40">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="flex max-w-[130px] flex-col items-center justify-center rounded-3xl bg-cardOverlay p-4 drop-shadow-lg backdrop-blur-md sm:max-w-none md:w-190"
              >
                <img
                  src={n.imgSrc}
                  className="-mt-10 w-20 md:-mt-16 md:w-28 lg:-mt-20 lg:w-40"
                  alt="I1"
                />
                <p className="mt-2 text-base font-semibold text-textColor dark:text-primary lg:mt-4 lg:text-xl">
                  {n.name}
                </p>
                <p className="my-1 text-[12px] font-semibold text-lighttextGray dark:text-gray-200 lg:my-3 lg:text-sm">
                  {n.description}
                </p>
                <p className="text-sm font-semibold text-headingColor dark:text-gray-300">
                  <span className="text-xs line-through">
                    $ {parseFloat(n.price * 1.2).toFixed(2)}
                  </span>{" "}
                  <span className="text-sm text-red-600 dark:text-red-500">
                    ${n.price}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
