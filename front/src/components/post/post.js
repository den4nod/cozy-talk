import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'

export function Post({ subject, body, tags }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <Card variant='outlined' maxWidth='sm'>
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
    </Container>
  )
}

Post.propTypes = {
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.string
}

Post.defaultProps = {
  tags: ''
}
