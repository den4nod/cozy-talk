import Typography from '@mui/material/Typography'

export function PageTitle({ pageTitle }) {
  return (
    <Typography gutterBottom variant='h4' component='div' mt={3}>
      {pageTitle}
    </Typography>
  )
}
