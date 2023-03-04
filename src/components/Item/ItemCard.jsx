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
      className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] my-12 py-2 px-4 bg-cardOverlay rounded-lg backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
    >
      <div className="w-full flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.2 }} className="w-40 h-40 -mt-8 drop-shadow-2xl">
          <img src={item.imageURL} alt={`row-img-${item.id}`} className="w-full h-full object-contain" />
        </motion.div>
        {cartItems[item.id]?.cartQty > 0 ? (
          <div className="flex items-center justify-center -mt-8">
            <ItemQuantityControl item={cartItems[item.id]} />
          </div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
            onClick={() => addToCart(item)}
          >
            <MdShoppingBasket className="text-white" />
          </motion.div>
        )}
      </div>
      <div className="w-full flex flex-col items-end justify-end -mt-8">
        <p className="text-textColor font-semibold capitalize text-base md:text-lg">{item.title}</p>
        <p className="mt-1 text-sm text-gray-500">{item.calories} Calories</p>
        <div className="flex items-center gap-8">
          <p className="text-lg text-headingColor font-semibold">
            <span className="text-sm text-red-500">$</span> {item.price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
