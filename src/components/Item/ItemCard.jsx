import { motion } from "framer-motion"
import React from "react"
import { MdShoppingBasket } from "react-icons/md"

import { actionType, useStateValue } from "@/context"
import ItemQuantityControl from "./ItemQuantityControl"

const ItemCard = ({ item }) => {
  const [{ cartItems }, dispatch] = useStateValue()

  const addToCart = (item) => {
    let cartQty = 1
    if (item.id in cartItems) {
      cartQty = cartItems[item.id].cartQty + 1
    }

    dispatch({
      type: actionType.SET_CART,
      cartItems: { ...cartItems, [item.id]: { ...item, cartQty } },
    })
  }

  return (
    <div
      key={item.id}
      className="relative my-12 flex h-[175px] w-275 min-w-[275px] flex-col items-center justify-evenly rounded-lg bg-cardOverlay py-2 px-4 backdrop-blur-lg hover:drop-shadow-lg md:w-300 md:min-w-[300px]"
    >
      <div className="flex w-full items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="-mt-12 h-40 w-40 drop-shadow-2xl"
        >
          <img
            src={item.imageURL}
            alt={`row-img-${item.id}`}
            className="h-full w-full object-contain"
          />
        </motion.div>
        {cartItems[item.id]?.cartQty > 0 ? (
          <div className="-mt-8 flex items-center justify-center">
            <ItemQuantityControl item={cartItems[item.id]} />
          </div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="-mt-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 hover:shadow-md"
            onClick={() => addToCart(item)}
          >
            <MdShoppingBasket className="text-white" />
          </motion.div>
        )}
      </div>
      <div className="-mt-8 flex w-full flex-col items-end justify-end">
        <p className="text-base font-semibold capitalize text-textColor dark:text-primary md:text-lg">
          {item.title}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-primary">
          {item.calories} Calories
        </p>
        <div className="flex items-center gap-8">
          <p className="text-lg font-semibold text-headingColor dark:text-primary">
            <span className="text-sm text-red-500">$</span> {item.price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
