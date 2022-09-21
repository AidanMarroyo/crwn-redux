import { CATEGORY_ACTION_TYPES } from './category-types'

const CATEGORY_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  //^ state needed for redux-thunk. tells our reducer to track whether or not if its in a loading state
  error: null,
  //^ state needed for redux-thunk
}

export const categoriesReducer = (
  state = CATEGORY_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action

  switch (type) {
    //this case states that the moment we start fetching (FETCH_CATEGORY_START) we are in a loading state
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
      }

    //this case states that if categories is fetched successfully, set categories with the payload. at this point the state is no longer loading
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      }

    case CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      }

    default:
      return state
  }
}
