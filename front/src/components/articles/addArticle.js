import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'

export function AddArticle({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
    </Container>
  )
}
