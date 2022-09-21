import { createSelector } from 'reselect'

//Selector should be what extrapolates the logic that pushes our values into the reducer

// slices the state of cart from rootReducer store
const selectCartReducer = (state) => state.cart

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
  //^ cartItems found from initial state in cartReducer
)

export const selectCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
  //^ isCartOpen found from initial state in cartReducer
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  //^ we pass selectCartItems as the input argument so cartItems is accessible
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
)

export const selectCartCount = createSelector(
  [selectCartItems],
  //^ we pass selectCartItems as the input argument so cartItems is accessible
  (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)
