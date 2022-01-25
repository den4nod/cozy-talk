import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import PropTypes from 'prop-types'

export function Post({ body, dateCreated }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 2 }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {body}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {dateCreated}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

Post.propTypes = {
  body: PropTypes.string.isRequired,
  dateCreated: PropTypes.string
}

Post.defaultProps = {
  dateCreated: ''
}
