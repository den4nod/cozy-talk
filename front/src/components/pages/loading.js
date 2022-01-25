import { CircularProgress, Container } from '@mui/material'

export function Loading() {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <CircularProgress />
    </Container>
  )
}
