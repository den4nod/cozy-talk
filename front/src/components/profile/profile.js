import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import PropTypes from 'prop-types';

export function Profile({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
    </Container>
  )
}

Profile.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
