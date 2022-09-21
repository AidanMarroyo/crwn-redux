import { CartItemContainer, Image, ItemDetails, Span } from './cart-item.styles'

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem
  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Span>{name}</Span>
        <Span>
          {quantity} x ${price}
        </Span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem
