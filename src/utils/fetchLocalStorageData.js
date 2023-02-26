import { LOCAL_STORAGE_CONST } from "./constants"

const getFromLocalStorage = (key) => {
  return localStorage.getItem(key) !== "undefined" ? JSON.parse(localStorage.getItem(key)) : localStorage.clear()
}

export const fetchUser = () => {
  const user = getFromLocalStorage(LOCAL_STORAGE_CONST.USER)
  return user
}

export const fetchCart = () => {
  const cartItems = getFromLocalStorage(LOCAL_STORAGE_CONST.CART_ITEMS)
  return cartItems ? cartItems : {}
}

export const fetchCartTotal = () => {
  const cartTotal = getFromLocalStorage(LOCAL_STORAGE_CONST.CART_TOTAL)
  return cartTotal ? parseFloat(cartTotal.toFixed(2)) : 0
}
