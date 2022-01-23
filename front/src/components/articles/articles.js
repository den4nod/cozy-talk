import { PostContainer } from '../../containers/post/post'
import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'

export function Articles({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
      <PostContainer />
    </Container>
  )
}

Articles.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
