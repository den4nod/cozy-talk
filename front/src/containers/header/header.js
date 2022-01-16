import Button from '@mui/material/Button'
import { ButtonGroup } from '@mui/material'
import {
  ADD_ARTICLE_PAGE,
  ADD_ARTICLE_PAGE_TITLE,
  ARTICLES_PAGE,
  ARTICLES_PAGE_TITLE,
  PROFILE_PAGE, PROFILE_PAGE_TITLE
} from '../../constants'
import PropTypes from 'prop-types'

const VARIANT_CONTAINED = 'contained'
const VARIANT_TEXT = 'text'

export function HeaderContainer({ page, onPageChange, onPageTitleChange }) {

  const updateArticlesPage = () => {
    onPageChange(ARTICLES_PAGE)
    onPageTitleChange(ARTICLES_PAGE_TITLE)
  }

  const updateAddArticlePage = () => {
    onPageChange(ADD_ARTICLE_PAGE)
    onPageTitleChange(ADD_ARTICLE_PAGE_TITLE)
  }

  const updateProfilePage = () => {
    onPageChange(PROFILE_PAGE)
    onPageTitleChange(PROFILE_PAGE_TITLE)
  }

  return (
    <div>
      <ButtonGroup variant={VARIANT_TEXT} aria-label='text button group'>
        <Button variant={page === ARTICLES_PAGE ? VARIANT_CONTAINED : VARIANT_TEXT} onClick={updateArticlesPage}>
          {ARTICLES_PAGE_TITLE}
        </Button>
        <Button variant={page === ADD_ARTICLE_PAGE ? VARIANT_CONTAINED : VARIANT_TEXT} onClick={updateAddArticlePage}>
          {ADD_ARTICLE_PAGE_TITLE}
        </Button>
        <Button variant={page === PROFILE_PAGE ? VARIANT_CONTAINED : VARIANT_TEXT} onClick={updateProfilePage}>
          {PROFILE_PAGE_TITLE}
        </Button>
      </ButtonGroup>
    </div>
  )
}

HeaderContainer.propTypes = {
  page: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageTitleChange: PropTypes.func.isRequired
}
