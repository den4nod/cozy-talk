import { PostContainer } from '../../containers/post/post'
import { PageTitle } from '../pageTitle/pageTitle'
import { Container } from '@mui/material'

export function Articles({ pageTitle }) {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <PageTitle pageTitle={pageTitle} />
      <PostContainer
        subject='First post'
        body='The first post in CozyTalk social network.
                      The first post is very special.
                      It is the face of each profile.
                      It makes an impression on friends and
                      other people in community who view your page.'
        tags={['first post', 'post', 'cozy talk', 'news']}
      />
    </Container>
  )
}
