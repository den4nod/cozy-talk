import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export function Post({ subject, body, tags }) {
  return (
    <div>
      <Card variant='outlined' sx={{ maxWidth: 350, margin: 'auto' }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {subject}
          </Typography>
          <Typography variant='body2' color='text.secondary' pb={1}>
            {body}
          </Typography>
          <Typography variant='body2'>
            {tags}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
