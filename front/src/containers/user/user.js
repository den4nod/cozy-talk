import React from 'react'
import { useQuery } from 'react-query'
import { Loading } from '../../components/pages/loading'
import { Error } from '../../components/pages/error'
import { getUserById } from './api/usersCrud'
import { User } from '../../components/users/user'
import PropTypes from 'prop-types'

const UserContainer = ({ userId }) => {

  const { isFetching, isLoading, isError, error, data } =
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
          userInfo={user}
          userDetails={true}
        />
      )}
    </>
  )
}

UserContainer.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserContainer
