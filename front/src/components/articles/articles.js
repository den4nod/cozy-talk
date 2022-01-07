import { PostContainer } from '../../containers/post/post'
import Typography from '@mui/material/Typography'

export function Articles({ pageTitle }) {
  return (
    <div>
      <Typography gutterBottom variant='h4' component='div' mt={3}>
        {pageTitle}
      </Typography>
      <PostContainer
        subject='First post'
        body='The first post in CozyTalk social network.
                      The first post is very special.
                      It is the face of each profile.
                      It makes an impression on friends and
                      other people in community who view your page.'
        tags={['first post', 'post', 'cozy talk', 'news']}
      />
    </div>
  )
}
