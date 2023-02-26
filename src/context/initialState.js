import {
  fetchCart,
  fetchCartTotal,
  fetchUser,
} from "../utils/fetchLocalStorageData"

const userInfo = fetchUser()
const cartInfo = fetchCart()
const cartTotal = fetchCartTotal()

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
  cartTotal: cartTotal,
}
