import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart-selector'
import { useSelector } from 'react-redux'

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles'

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </CheckoutHeader>

      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>${cartTotal}</Total>
    </CheckoutContainer>
  )
}

export default Checkout
