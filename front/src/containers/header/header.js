import Button from '@mui/material/Button'
import { ButtonGroup } from '@mui/material'

export function HeaderContainer({ page, onPageChange, onPageTitleChange }) {

  const updatePage = (page, pageTitle) => {
    onPageChange(page)
    onPageTitleChange(pageTitle)
  }

  return (
    <div>
      <ButtonGroup variant='text' aria-label='text button group'>
        <Button variant={page === 'articles' ? 'contained' : 'text'}
          onClick={() => updatePage('articles', 'Articles')}>
          Articles
        </Button>
        <Button variant={page === 'addArticle' ? 'contained' : 'text'}
          onClick={() => updatePage('addArticle', 'Add article')}>
          Add article
        </Button>
        <Button variant={page === 'profile' ? 'contained' : 'text'}
          onClick={() => updatePage('profile', 'Profile')}>
          Profile
        </Button>
      </ButtonGroup>
    </div>
  )
}
