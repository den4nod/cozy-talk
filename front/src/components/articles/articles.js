import { PostContainer } from '../../containers/post/post'
import { PageTitle } from '../pageTitle/pageTitle'
import PropTypes from 'prop-types'

export function Articles({ pageTitle }) {
  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <PostContainer />
    </>
  )
}

Articles.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
