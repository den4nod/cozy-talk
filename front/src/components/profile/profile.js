import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'

export function Profile({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
    </Container>
  )
}
