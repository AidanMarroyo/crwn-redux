/* button types:
default
inverted
google sign in
*/

import { BaseButton, GoogleButton, InvertedButton } from './button.styles'

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType])

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType)
  return <CustomButton {...otherProps}>{children}</CustomButton>
  // the dynamic class name allows for one button component to be shared amongst the whole application while still adding the ability to add unique styles
}

//children prop represent what the text will be inside the button

export default Button
