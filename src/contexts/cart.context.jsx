import { createContext, useReducer } from 'react'

//Cart context is being use to determine whether the state isCartOpen false or true

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  /*
  const payload = {
    cartItems,
    cartCount,
    cartTotal,
  }
  */

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }

    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const { isCartOpen, cartItems, cartCount, cartTotal } = state

  const updateCartItemsReducer = (newCartItems) => {
    //generate newCartTotal
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )

    //generate newCartCount
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    })
    /* 
    dispatch new action with payload = {
      newCartItems,
      newCartTotal,
      newCartCount,
    }
    */
  }

  //what we set our new cart to
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems)
  }

  const setIsCartOpen = (boolean) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: boolean })
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
