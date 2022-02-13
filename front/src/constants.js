import { createTheme } from '@mui/material'
import PropTypes from 'prop-types'

export const ARTICLES_PAGE = 'articles'
export const ARTICLES_PAGE_TITLE = 'Articles'
export const ADD_ARTICLE_PAGE = 'addArticle'
export const ADD_ARTICLE_PAGE_TITLE = 'Add article'
export const EDIT_ARTICLE_PAGE_TITLE = 'Edit article'
export const PROFILE_PAGE = 'profile'
export const PROFILE_PAGE_TITLE = 'Profile'
export const USERS_PAGE = 'users'
export const USERS_PAGE_TITLE = 'Users'
export const USER_PAGE_TITLE = 'User'

export const API_ENDPOINTS = {
  ARTICLES: '/articles',
  USERS: '/users'
}

export const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff'
    }
  }
})

export const availabilityStatuses = [
  { id: 1, value: 'all', label: 'All' },
  { id: 2, value: 'friends', label: 'Friends' },
  { id: 3, value: 'onlyMe', label: 'Only Me' }
]

export const universities = [
  { id: 1, label: 'Sumy State University', value: 'SumyStateUniversity' },
  { id: 2, label: 'Igor Sikorsky Kyiv Polytechnic Institute', value: 'IgorSikorskyKyivPolytechnicInstitute' },
  { id: 3, label: 'Sumy National Agrarian University', value: 'SumyNationalAgrarianUniversity' }
]

export const autocompleteOptionPropTypes = PropTypes.shape({
  id: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string
})
