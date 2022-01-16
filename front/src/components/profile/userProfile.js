import PropTypes from 'prop-types'

export function UserProfile({ fullName, age }) {
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
