import { LOCAL_STORAGE_CONST } from "../utils/constants"

const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_SHOW_CART: "SET_SHOW_CART",
  SET_CART: "SET_CART",
  REMOVE_CART: "REMOVE_CART",
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      localStorage.setItem(LOCAL_STORAGE_CONST.USER, JSON.stringify(action.user))
      return {
        ...state,
        user: action.user,
      }
    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      }
    case actionType.SET_SHOW_CART:
      return {
        ...state,
        cartShow: action.cartShow,
      }
    case actionType.SET_CART: {
      const cartItemsArr = Object.values(action.cartItems)
      const total = cartItemsArr.reduce((prevTotal, currentItem) => {
        return prevTotal + currentItem.price * currentItem.cartQty
      }, 0)

      localStorage.setItem(LOCAL_STORAGE_CONST.CART_ITEMS, JSON.stringify(action.cartItems))
      localStorage.setItem(LOCAL_STORAGE_CONST.CART_TOTAL, total)
      return {
        ...state,
        cartItems: action.cartItems,
        cartTotal: parseFloat(total.toFixed(2)),
      }
    }
    case actionType.REMOVE_CART: {
      localStorage.removeItem(LOCAL_STORAGE_CONST.CART_ITEMS)
      localStorage.removeItem(LOCAL_STORAGE_CONST.CART_TOTAL)
      return {
        ...state,
        cartItems: {},
        cartTotal: 0,
      }
    }
  }

  return state
}

export { reducer, actionType }
