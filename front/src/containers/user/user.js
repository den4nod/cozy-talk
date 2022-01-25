import React from 'react'
import { useQuery } from 'react-query'
import { Loading } from '../../components/pages/loading'
import { Error } from '../../components/pages/error'
import Button from '@mui/material/Button'
import { getUserById } from './api/usersCrud'
import { User } from '../../components/users/user'
import PropTypes from 'prop-types'

const UserContainer = ({ userId }) => {

  const BUTTON_TEXT = {
    FETCH_USER: 'Fetch user'
  }

  const { isFetching, isLoading, isError, error, refetch, data } =
    useQuery(`user-${userId}`, () => getUserById(userId))
  const user = data?.data[0] || {}

  return (
    <>
      {(isLoading || isFetching) ? (
        <Loading />
      ) : isError ? (
        <Error title={error.message} />
      ) : (
        <User
          key={user?.user_id}
          userId={user?.user_id}
          name={user?.name}
          email={user?.email}
          phone={user?.phone}
          userDetails={true}
        />
      )}
      <Button variant='outlined' sx={{ mt: 3 }} onClick={refetch}>
        {BUTTON_TEXT.FETCH_USER}
      </Button>
    </>
  )
}

UserContainer.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserContainer
