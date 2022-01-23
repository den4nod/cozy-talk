import React from 'react'
import { useQuery } from 'react-query'
import { Loading } from '../../components/pages/loading'
import { Error } from '../../components/pages/error'
import Button from '@mui/material/Button'
import { getUsers } from './api/usersCrud'
import { User } from '../../components/users/user'

const UsersContainer = () => {

  const BUTTON_TEXT = {
    FETCH_USERS: 'Fetch users'
  }

  const { isFetching, isLoading, isError, error, refetch, data } =
    useQuery('users', () => getUsers())
  const users = data?.data || []

  return (
    <>
      {(isLoading || isFetching) ? (
        <Loading />
      ) : isError ? (
        <Error title={error.message} />
      ) : (
        users.map(({ user_id, name, email, phone }) => (
          <User
            key={user_id}
            userId={user_id}
            name={name}
            email={email}
            phone={phone}
          />)
        )
      )}
      <Button variant='outlined' sx={{ mt: 3 }} onClick={refetch}>
        {BUTTON_TEXT.FETCH_USERS}
      </Button>
    </>
  )
}

export default UsersContainer
