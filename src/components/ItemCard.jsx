import React from "react"
import { MdShoppingBasket } from "react-icons/md"
import { motion } from "framer-motion"

const ItemCard = ({ data }) => {
  return (
    <div
      key={data.id}
      className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] my-12 py-2 px-4 bg-cardOverlay rounded-lg backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
    >
      <div className="w-full flex items-center justify-between">
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={data.imageURL}
          alt={`row-img-${data.id}`}
          className="w-40 max-h-48 -mt-8 drop-shadow-2xl"
        />

        <div className="flex flex-col items-end justify-between gap-2">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
          >
            <MdShoppingBasket className="text-white" />
          </motion.div>

          <div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold capitalize text-base md:text-lg">
                {data.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {data.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {data.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
