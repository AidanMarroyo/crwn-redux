import { createSelector } from 'reselect'
//Selector should be what extrapolates the logic that pushes our values into the reducer

// slices the state of categories from rootReducer store
const selectCategoryReducer = (state) => state.categories

//creates a memoized selector
//first is the array of input selectors (selectCategoryReducer)
//this selectCategories selector  will only run if the state of categories changes
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
  //^ categories found from initial state in categoryReducer
)

//as long as the category array doesn't change, don't rerun this method. runs reduce once and other wise we will just run previous value
export const selectCategoriesMap = createSelector(
  [selectCategories],
  //^ we pass selectCategries as the input argument so categories is accessible
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items
      return acc
    }, {})
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
  //^slices the isLoading state from the cateogoryReducer
)
