import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'

export function PostRoute({ title, body }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={title} />
      <Typography variant='h5' fontStyle={'italic'}>
        {body}
      </Typography>
    </Container>
  )
}
