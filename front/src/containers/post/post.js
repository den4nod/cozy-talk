import { Post } from '../../components/post/post'
import PropTypes from 'prop-types'

export function PostContainer({ subject, body, tags }) {
  return <Post subject={subject} body={body} tags={hashtagString(tags)} />
}

const hashtagString = (tags) => {
  return tags.reduce((hashtagString, tag) =>
    hashtagString + '#' + tag.split(' ').join('') + ' ', '').trim()
}

PostContainer.propTypes = {
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.array
}

PostContainer.defaultProps = {
  tags: []
}
