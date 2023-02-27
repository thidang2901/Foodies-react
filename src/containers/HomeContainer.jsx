import React from "react"

import Delivery from "@assets/images/delivery.png"
import HeroBg from "@assets/images/heroBg.png"
import { heroData } from "@utils/data"

const HomeContainer = () => {
  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex flex-row items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img src={Delivery} className="w-full h-full object-contain" alt="delivery" />
          </div>
        </div>

        <p className="md:max-w-2xl text-[1.5rem] md:text-[3.5rem] font-bold tracking-wide text-headingColor">
          <span className="text-orange-600 text-[2rem] md:text-[4rem]">Foodies</span>
          <br />
          Deliver happiness to your door
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Craving something tasty? Our all-in-one service that has everything you need to satisfy your hunger and
          thirst. Browse our selection of mouth-watering fast food, hearty rice dishes, juicy fruits, and cold soft
          drinks and have your meal delivered to your doorstep.
        </p>

        <button
          type="button"
          className="md:w-auto text-white bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>

      <div className="py-2 flex-1 flex items-center relative">
        <img src={HeroBg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="hero-bg" />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img src={n.imgSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="I1" />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">{n.name}</p>
                <p className="text-[12px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-3">{n.description}</p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default HomeContainer
