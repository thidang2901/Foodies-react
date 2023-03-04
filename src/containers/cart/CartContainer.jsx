import { motion } from "framer-motion"
import React, { useMemo, useState } from "react"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { RiRefreshFill } from "react-icons/ri"

import { CartItem } from "@/components/Item"
import { actionType, useStateValue } from "@/context"

import EmptyCart from "@/assets/images/emptyCart.svg"

const CartContainer = () => {
  const [{ cartShow, cartItems, cartTotal, user }, dispatch] = useStateValue()
  const [modalShown, toggleModal] = useState(false)
  // TODO: implement setDeliveryPrice
  const [deliveryPrice, setDeliveryPrice] = useState(2.5)

  const handleCheckout = () => {
    console.log("checkout this")
    if (!user) {
      toggleModal(true)
    }
  }

  const showCart = () => {
    dispatch({
      type: actionType.SET_SHOW_CART,
      cartShow: !cartShow,
    })
  }

  const clearCart = () => {
    dispatch({
      type: actionType.REMOVE_CART,
    })
  }

  const totalPrice = useMemo(() => {
    return cartTotal + deliveryPrice
  }, [cartTotal, deliveryPrice])

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* cart item section */}
      {Object.keys(cartItems).length > 0 ? (
        <div className="w-full h-full bg-cartBg flex flex-col">
          {/* cart item list */}
          <div className="w-full h-340 md:h-420 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {Object.values(cartItems).map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* cart total */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {cartTotal}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ {deliveryPrice}</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">$ {totalPrice}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 my-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg  hover:shadow-lg transition-all duration-150 ease-out"
              onClick={handleCheckout}
            >
              Check Out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="img-empty-cart" className="w-300" />
          <p className="text-xl text-textColor font-semibold">Add some items to your cart</p>
        </div>
      )}

      {modalShown && <LoginModal close={() => toggleModal(false)} />}
    </motion.div>
  )
}

export default CartContainer
