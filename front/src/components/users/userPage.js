import { PageTitle } from '../pageTitle/pageTitle'
import PropTypes from 'prop-types'
import UserContainer from '../../containers/user/user'
import { useParams } from 'react-router-dom'

export function UserPage({ pageTitle }) {

  const { userId } = useParams()

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <UserContainer userId={userId} />
    </>
  )
}

UserPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
