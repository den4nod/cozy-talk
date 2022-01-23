import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'
import UserContainer from '../../containers/user/user'
import { useParams } from 'react-router-dom'

export function UserPage({ pageTitle }) {

  const { userId } = useParams()

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
      <UserContainer userId={userId} />
    </Container>
  )
}

UserPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
