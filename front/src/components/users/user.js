import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, CardActions, Container, Modal, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../../constants'
import { useState } from 'react'
import UserFormContainer from '../../containers/forms/userForm'

export function User({ userInfo, userDetails }) {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [user, setUser] = useState(userInfo)

  const BUTTON_TEXT = {
    USER_DETAILS: 'Details',
    USER_UPDATE: 'Update'
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
      <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 2 }}>
        <Card variant='outlined'>
          <CardContent>
            <Stack direction='row' spacing={1} sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1
            }}>
              {user?.avatar_id && <Avatar
                src={user ? `http://localhost:3090/avatars/${user.avatar_id}/img` : undefined}
                alt='Article image'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 100,
                  height: 100
                }} />}
              {user?.avatar_id == null && <Avatar
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 76,
                  height: 76
                }} >
                {resolveFirstLetterFrom(user.name)}
              </Avatar>}
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
              <Button size='small' onClick={handleOpen}>
                {BUTTON_TEXT.USER_UPDATE}
              </Button>
            </CardActions>}
        </Card>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <UserFormContainer
            user={user}
            setUser={setUser}
            userId={userInfo.user_id}
            handleModalClose={handleClose}
            resolveFirstLetterFrom={resolveFirstLetterFrom}
          />
        </div>
      </Modal>
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
