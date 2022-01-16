import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'

export function AddArticle({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
    </Container>
  )
}

AddArticle.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
