import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'

export function Error({ title }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', color: '#c62828' }}>
      <PageTitle pageTitle={title} />
    </Container>
  )
}

Error.propTypes = {
  title: PropTypes.string.isRequired
}
