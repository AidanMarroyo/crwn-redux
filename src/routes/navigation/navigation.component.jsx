import { Outlet } from 'react-router-dom'
import { Fragment } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { useSelector } from 'react-redux'
import { selectCartOpen } from '../../store/cart/cart-selector'

import CartIcon from '../../components/cart-icon/cart-icon.component'

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from './navigation.styles.jsx'
import { userSelector } from '../../store/user/user-selector'

const Navigation = () => {
  //useSelector is a hook that allows us to interact from a component with the redux store
  //useSelector is a hook you pass a selector function
  //A selector function extracts off the values that you want from the redux store
  const currentUser = useSelector(userSelector)
  const isCartOpen = useSelector(selectCartOpen)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>SHOP</NavLink>

          {/* This says that if there is a currentUser signed in then change to 'SIGN OUT' if there is no logged in user, display 'SIGN IN' */}
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon className='nav-link' />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
        {/* The double && (short circuit operator) means that if the total line above evaluates to true (components can be truthy thats why they are functional components) then display the component CartDropdown, if not show nothing */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
