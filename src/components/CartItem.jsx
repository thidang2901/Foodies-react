import React from "react"
import ItemQuantityControl from "./ItemQuantityControl"

const CartItem = ({ item }) => {
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img src={item.imageURL} alt="cart-item" className="w-20 h-20 max-w-[60px] rounded-full object-contain" />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat((item.price * item.cartQty).toFixed(2))}
        </p>
      </div>

      <ItemQuantityControl item={item} bgColor="dark" />
    </div>
  )
}

export default CartItem
