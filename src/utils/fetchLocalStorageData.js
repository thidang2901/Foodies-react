export const fetchUser = () => {
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear()
  return user
}

export const fetchCart = () => {
  const cartItems =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear()
  return cartItems ? cartItems : {}
}

export const fetchCartTotal = () => {
  const cartTotal =
    localStorage.getItem("cartTotal") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartTotal"))
      : localStorage.clear()
  return cartTotal ? parseFloat(cartTotal.toFixed(2)) : 0
}
