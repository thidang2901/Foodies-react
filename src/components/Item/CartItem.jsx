import React from "react"

import ItemQuantityControl from "./ItemQuantityControl"

const CartItem = ({ item }) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-cartItem p-1 px-2">
      <img
        src={item.imageURL}
        alt="cart-item"
        className="h-20 w-20 max-w-[60px] rounded-full object-contain"
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className="block text-sm font-semibold text-gray-300">
          $ {parseFloat((item.price * item.cartQty).toFixed(2))}
        </p>
      </div>

      <ItemQuantityControl item={item} bgColor="dark" />
    </div>
  )
}

export default CartItem
