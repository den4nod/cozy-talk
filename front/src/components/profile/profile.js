import Typography from '@mui/material/Typography'

export function Profile({ pageTitle }) {
  return (
    <div>
      <Typography gutterBottom variant='h4' component='div' mt={3}>
        {pageTitle}
      </Typography>
    </div>
  )
}
