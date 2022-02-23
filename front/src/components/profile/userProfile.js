import PropTypes from 'prop-types'
import { useContext } from 'react'
import authContext from '../../contexts/authContext'

export function UserProfile({ fullName, age }) {

  const { authenticated, accessToken, expiresIn } = useContext(authContext)
  // for task, todo: remove later
  console.log('authenticated: ', authenticated)
  console.log('accessToken: ', accessToken)
  console.log('expiresIn: ', expiresIn)

  return (
    <div>
      <p><b>Name:</b> {fullName}</p>
      <p><b>Age:</b> {age}</p>
    </div>
  )
}

UserProfile.propTypes = {
  fullName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
}
