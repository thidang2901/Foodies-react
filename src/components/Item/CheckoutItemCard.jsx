import React from "react"

import { useStateValue } from "@/context"
import ItemQuantityControl from "./ItemQuantityControl"

const CheckoutItemCard = ({ item }) => {
  const [{ cartItems }, dispatch] = useStateValue()

  return (
    <div
      key={item.id}
      className="flex flex-col items-center justify-evenly rounded-lg bg-cardOverlay py-2 px-4 backdrop-blur-lg hover:drop-shadow-lg"
    >
      <div className="flex w-full items-center justify-start gap-3">
        <div className="h-32 w-32">
          <img
            src={item.imageURL}
            alt={`row-img-${item.id}`}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex w-44 flex-col items-start justify-start gap-1 text-base">
          <p className="font-semibold capitalize text-textColor dark:text-primary md:text-lg">
            {item.title}
          </p>
          <p className="text-gray-500 dark:text-primary">{item.calories} Calories</p>
          <p className="font-semibold text-headingColor dark:text-primary">
            <span className="text-red-500">$</span>
            {item.price}
          </p>
        </div>

        <div className="flex w-20">
          <p className="font-semibold text-headingColor dark:text-primary">
            <span className="text-red-500">$</span>
            {parseFloat((item.price * item.cartQty).toFixed(2))}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <ItemQuantityControl item={cartItems[item.id]} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutItemCard
