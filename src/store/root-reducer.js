import { combineReducers } from 'redux'
import { cartReducer } from './cart/cartReducer'
import { categoriesReducer } from './categories/categoryReducer'

import { userReducer } from './user/userReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
})
