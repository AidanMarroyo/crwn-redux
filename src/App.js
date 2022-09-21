import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'
import Checkout from './routes/checkout/checkout.component'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { checkUserSession } from './store/user/user-actions'

import Shop from './routes/shop/shop.component'
const App = () => {
  const dispatch = useDispatch()

  //Use effect is used so that the listener is mounted just once and can only be mounted when the dependent is set. In this case there is none
  useEffect(() => {
    dispatch(checkUserSession())
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        {/* index is the component that displays with the parent component when the
        path is '/' */}

        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
