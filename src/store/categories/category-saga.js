import { takeLatest, all, call, put } from 'redux-saga/effects'
//^ importing side effect generators
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category-actions'
import { CATEGORY_ACTION_TYPES } from './category-types'

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories')
    //^ Anytime you have a function and you want to turn it into an effect you use call()
    //**How call() Works: pass it a variable that is a callable method, the second pass is the parameters you want to set with the callable method */
    yield put(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    yield put(fetchCategoriesFailed(error))
    //^ if any of the asynchronous calls failed we dispatch the failed action
  }
}
//^ Generator Function

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START,
    fetchCategoriesAsync
  )
  //**Whenever we "take the latest" FETCH_CATEGORY_START action, we initialize the fetchCategoriesAsync() saga */
  //takeLatest says that if you hear the same action repeatedly, give me the latest one
  //takeLatest gets two arguments: First: Action type to respond to, Second: what we want to do as a response
}
//^ Generator Function

export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
  //all() is an effect that says run everything inside the bracket and only complete when everything ran is done
}
//^ Accumulator that holds all of the sagas related to categories

// **GENERATORS RESPOND TO ACTIONS THE SAME WAY REDUCERS DO INSIDE OF SWITCH STATEMENTS
