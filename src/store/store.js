import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
//^ thunks allow actions to be passed as functions
//thunks are utilized on asynchronous behavior that you can move into an action driven flow
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'
import { rootReducer } from './root-reducer'

//MANUALLY CREATING THE LOGGER MIDDLEWARE USING A CURRIED FUNCTION
// const loggerMiddleware = (store) => (next) => (action) => {
//     if(!action.type){
//         return next()
//     }
//     console.log('type:', action.type)
//     console.log('payload:', action.payload)
//     console.log('current state:', action.getState())

//THE CONSOLELOGS AFTER 'NEXT()' WIILL ONLY RUN AFTER 'NEXT()'
//     next()

//     console.log('next state:', store.getState())
// }

//persistConfig tell us the configuration settings for the persist
const persistConfig = {
  key: 'root',
  //^Persisting from the root level. We want to persist the whole thing
  storage: storage,
  //^defaults to local storage

  // blacklist: ['user', 'categories'],
  //^blacklist allows for any chosen reducer NOT TO BE persisted over to a new session

  whitelist: ['cart'],
  //^whitelist allows for chosen reducer TO BE persisted over to new session
}

const sagaMiddleware = createSagaMiddleware()
//combines persistConfig and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//logger allows us to see what the  state looks like before an action is dispatched and what the action is and how the state looks after the action
//whenever you dispatch an action, before the action hits the reducers it hits the middleware first
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean)
//^ this says that if the environment does not equal 'production' then render the logger. The filter(Boolean) portion is added so that if the condition is falsy it doesn't pass False as a middleware, which in turn would webpage to crash

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
//^ this states that if th environment does not equal production and if there is a window object, then utilize the redux devtools compose so that the devTools chrome extension can be utilized. If this is falsy, then just use compose provided by the redux library

//...middleware just spreads the array in the case that there were more middleware other than logger
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

//first argument passed through the create store method is rootReducer. In this case we used the persistReducer that combines the persistConfig and rootReducer. createStore needs a rootReducer to create a store
//second argument is passed as undefined, the second argument is for any additional default states you want to initialize
//third argument is the middleware we pass into the store
export const store = createStore(persistedReducer, undefined, composedEnhancers)
//^store gets imported into index.js
//^ by default store is going to be using persistedReducer

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
