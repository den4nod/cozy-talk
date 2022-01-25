import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, CardActions, Container, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../../constants'

export function User({ userId, name, email, phone, userDetails }) {

  const BUTTON_TEXT = {
    USER_DETAILS: 'Details'
  }

  const navigate = useNavigate()

  const redirectToUserPage = (userId) => () => {
    navigate(`${API_ENDPOINTS.USERS}/${userId}`)
  }

  const resolveFirstLetterFrom = (name) => {
    return name.length > 0 ? name.charAt(0).toUpperCase() : 'U'
  }

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 2 }}>
      <Card variant='outlined'>
        <CardContent>
          <Stack direction='row' spacing={1} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 1
          }}>
            <Avatar sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {resolveFirstLetterFrom(name)}
            </Avatar>
            <Typography gutterBottom variant='h5' component='div'>
              {name}
            </Typography>
          </Stack>
          <Typography variant='body2' pb={1}>
            {email}
          </Typography>
          <Typography variant='body2'>
            {phone}
          </Typography>
        </CardContent>
        {!!userDetails === false &&
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}>
            <Button size='small' onClick={redirectToUserPage(userId)}>
              {BUTTON_TEXT.USER_DETAILS}
            </Button>
          </CardActions>}
      </Card>
    </Container>
  )
}

User.propTypes = {
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  userDetails: PropTypes.bool
}

User.defaultProps = {
  phone: '',
  userDetails: false
}
