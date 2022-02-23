import { createContext } from 'react'

const authContext = createContext({
  authenticated: false,
  accessToken: '',
  expiresIn: ''
})

export default authContext
