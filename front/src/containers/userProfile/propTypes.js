import PropTypes from 'prop-types'

const mainAddress = PropTypes.shape({
  line1: PropTypes.string,
  line2: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.number
})

const alternativeAddress = PropTypes.shape({
  line1: PropTypes.string,
  line2: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.number
})

const address = PropTypes.shape({
  main: mainAddress,
  alt: alternativeAddress
})

const file = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  path: PropTypes.string
})

const files = PropTypes.arrayOf(
  file
)

const avatar = PropTypes.shape({
  file: file
})

export const userPropTypes = PropTypes.shape({
  name: PropTypes.string,
  age: PropTypes.string,
  avatar: avatar,
  files: files,
  addr: address,
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.string,
      avatar: avatar,
      files: files,
      addr: address
    })
  )
})
