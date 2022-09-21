import { useDispatch, useSelector } from 'react-redux'
import { selectCartOpen, selectCartCount } from '../../store/cart/cart-selector'
import { setIsCartOpen } from '../../store/cart/cart-actions'

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toggleIsCartOpenHandler = () => dispatch(setIsCartOpen(!isCartOpen))
  //^This toggle functions sets the setIsCartOpen to the opposite defaulted value
  return (
    <CartIconContainer onClick={toggleIsCartOpenHandler}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
