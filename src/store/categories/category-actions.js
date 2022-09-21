import { CATEGORY_ACTION_TYPES } from './category-types'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

// ACTION CREATORS

//No payload required because as soon as the  reducer sees this action, set loading to true
export const fetchCategoriesStart = () => {
  return { type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START }
}

//the action that sets the categories
export const fetchCategoriesSuccess = (categoriesArray) => {
  return {
    type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
    payload: categoriesArray,
  }
}

export const fetchCategoriesFailed = (error) => {
  return {
    type: CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED,
    payload: error,
  }
}

//^All 3 actions above are regular synchronous actions that would be used without thunk

// THUNK
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart())
//   try {
//     const categoriesArray = await getCategoriesAndDocuments('categories')
//     //^ if this await call succeeds then dispatch the action fetchCategorySuccess
//     dispatch(fetchCategoriesSuccess(categoriesArray))
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error))
//     //^ if any of the asynchronous calls failed we dispatch the failed action
//   }
// }
