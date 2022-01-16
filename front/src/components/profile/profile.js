import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'
import UserProfileContainer from '../../containers/userProfile/userProfile'
import { user } from './user'

export function Profile({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
      <UserProfileContainer
        firstName='Mr.'
        lastName='React'
        birthdayYear={2011}
        user={user}
      />
    </Container>
  )
}

Profile.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
