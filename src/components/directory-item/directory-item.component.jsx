import { useNavigate } from 'react-router-dom'

import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item'

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category
  const navigate = useNavigate()

  const navigateDirectoryHandler = () => navigate(route)
  return (
    <DirectoryItemContainer onClick={navigateDirectoryHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
