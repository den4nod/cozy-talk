import Typography from '@mui/material/Typography'

export function AddArticle({ pageTitle }) {
  return (
    <div>
      <Typography gutterBottom variant='h4' component='div' mt={3}>
        {pageTitle}
      </Typography>
    </div>
  )
}
