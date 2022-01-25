import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'
import UsersContainer from '../../containers/user/users'

export function UsersPage({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
      <UsersContainer />
    </Container>
  )
}

UsersPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
