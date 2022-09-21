import { CART_ACTION_TYPES } from './cart-types'

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contain productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )
  //if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }
  //return new array with modified cartItems/ new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  //check if quantity is equal to 1, if it is remove that item from count
  if (existingCartItem.quantity === 1) {
    //below means filter anything that equals false
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  //return back cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

// ACTION CREATORS *ANY ACTION CREATORS NEED TO BE DISPATCHED*
export const setIsCartOpen = (boolean) => {
  return {
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: boolean,
  }
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}

export const removeItemToCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear)
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}
