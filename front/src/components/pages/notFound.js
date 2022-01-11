import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'

export function NotFound() {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={'404 Page not found :('} />
    </Container>
  )
}
