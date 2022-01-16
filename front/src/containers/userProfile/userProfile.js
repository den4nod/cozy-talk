import React from 'react'
import PropTypes from 'prop-types'
import { UserProfile } from '../../components/profile/userProfile'
import { userPropTypes } from './propTypes'

const UserProfileContainer = ({ firstName, lastName, middleName, birthdayYear, user }) => {
  const fullName = `${firstName} ${lastName} ${middleName}`
  const age = 2021 - birthdayYear
  // for assignment only, todo: remove later
  console.log(user)
  return (
    <UserProfile fullName={fullName} age={age} />
  )
}

UserProfileContainer.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  middleName: PropTypes.string,
  birthdayYear: PropTypes.number.isRequired,
  user: userPropTypes
}

UserProfileContainer.defaultProps = {
  middleName: '',
  user: {}
}

export default UserProfileContainer
