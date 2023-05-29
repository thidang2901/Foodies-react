import { motion } from "framer-motion"
import React, { useMemo, useState } from "react"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { RiRefreshFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { CartItem } from "@/components/Item"
import { actionType, useStateValue } from "@/context"

import EmptyCart from "@/assets/images/emptyCart.svg"

import "./styles.css"

const CartContainer = () => {
  const navigate = useNavigate()

  const [{ cartShow, cartItems, cartTotal, user }, dispatch] = useStateValue()
  const [modalShown, toggleModal] = useState(false)
  // TODO: implement setDeliveryPrice
  const [deliveryPrice, setDeliveryPrice] = useState(2.5)

  const handleCheckout = () => {
    dispatch({
      type: actionType.SET_SHOW_CART,
      cartShow: false,
    })

    navigate("/checkout")
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
      className="cart"
    >
      <div className="cart__header">
        <motion.div whileTap={{ scale: 0.75 }} whileHover={{ scale: 1.1 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="cart__header-backspace" />
        </motion.div>
        <p className="cart__header-title">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          whileHover={{ scale: 1.1 }}
          className="cart__header-clear"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* cart item section */}
      {Object.keys(cartItems).length > 0 ? (
        <div className="cart__content">
          {/* cart item list */}
          <div className="cart__content-items">
            {Object.values(cartItems).map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* cart total */}
          <div className="cart__content-checkout">
            <div className="cart__content-checkout-block">
              <p className="cart__content-checkout-subTotal">Sub Total</p>
              <p className="cart__content-checkout-subTotal">$ {cartTotal}</p>
            </div>

            <div className="cart__content-checkout-block">
              <p className="cart__content-checkout-subTotal">Delivery</p>
              <p className="cart__content-checkout-subTotal">$ {deliveryPrice}</p>
            </div>

            <div className="my-2 w-full border-b border-gray-600"></div>

            <div className="cart__content-checkout-block">
              <p className="cart__content-checkout-total">Total</p>
              <p className="cart__content-checkout-total">$ {totalPrice}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="cart__content-checkoutBtn"
              onClick={handleCheckout}
            >
              Check Out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="cart__empty">
          <img className="cart__empty-img" src={EmptyCart} alt="img-empty-cart" />
          <p className="cart__empty-text">Add some items to your cart</p>
        </div>
      )}

      {modalShown && <LoginModal close={() => toggleModal(false)} />}
    </motion.div>
  )
}

export default CartContainer
