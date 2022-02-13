import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, CardActions, Container, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../../constants'
import { useState } from 'react'
import UserFormContainer from '../../containers/forms/userForm'

export function User({ userInfo, userDetails }) {

  const [user, setUser] = useState(userInfo)
  const [isEditing, setIsEditing] = useState(false)

  const BUTTON_TEXT = {
    USER_DETAILS: 'Details',
    USER_UPDATE: 'Update'
  }

  const setUnderEdition = () => {
    setIsEditing(true)
  }

  const navigate = useNavigate()

  const redirectToUserPage = (userId) => () => {
    navigate(`${API_ENDPOINTS.USERS}/${userId}`)
  }

  const resolveFirstLetterFrom = (name) => {
    return name.length > 0 ? name.charAt(0).toUpperCase() : 'U'
  }

  return (
    <>
      {isEditing === false && <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 2 }}>
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
                {user.name}
              </Typography>
            </Stack>
            <Typography variant='body2' pb={1}>
              {user.email}
            </Typography>
            <Typography variant='body2'>
              {user.phone}
            </Typography>
          </CardContent>
          {!!userDetails === false &&
            <CardActions sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end'
            }}>
              <Button size='small' onClick={redirectToUserPage(user.user_id)}>
                {BUTTON_TEXT.USER_DETAILS}
              </Button>
            </CardActions>}
          {!!userDetails === true &&
            <CardActions sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end'
            }}>
              <Button size='small' onClick={setUnderEdition}>
                {BUTTON_TEXT.USER_UPDATE}
              </Button>
            </CardActions>}
        </Card>
      </Container>}
      {isEditing === true && <UserFormContainer
        user={user}
        setUser={setUser}
        userId={userInfo.user_id}
        setIsEditing={setIsEditing}
      />}
    </>

  )
}

User.propTypes = {
  userInfo: PropTypes.shape({
    user_id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  userDetails: PropTypes.bool
}

User.defaultProps = {
  userDetails: false
}
