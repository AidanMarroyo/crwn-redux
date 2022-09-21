import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category-selector'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from '../../components/spinner/spinner.component'

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  return (
    //Object.keys allows you to pass in an object and convert it to an array so that array methods can be used ie.map
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return (
            <CategoryPreview key={title} title={title} products={products} />
          )
        })
      )}
    </Fragment>
  )
}

export default CategoriesPreview
