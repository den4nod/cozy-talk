import { Post } from '../../components/post/post'
import { useQuery } from 'react-query'
import { Loading } from '../../components/pages/loading'
import { Error } from '../../components/pages/error'
import Button from '@mui/material/Button'
import { getArticles } from './api/articlesCrud'

export function PostContainer() {

  const BUTTON_TEXT = {
    FETCH_ARTICLES: 'Fetch articles'
  }

  const { isFetching, isLoading, isError, error, refetch, data } =
    useQuery('articles', () => getArticles())
  const articles = data?.data || []

  return (
    <>
      {(isLoading || isFetching) ? (
        <Loading />
      ) : isError ? (
        <Error title={error.message} />
      ) : (
        articles.map(({ article_id, article_body, date_created }) => (
          <Post
            key={article_id}
            body={article_body}
            dateCreated={formatDateFromString(date_created)}
          />)
        )
      )}
      <Button variant='outlined' sx={{ mt: 3 }} onClick={refetch}>
        {BUTTON_TEXT.FETCH_ARTICLES}
      </Button>
    </>
  )
}

const formatDateFromString = (dateString) => {
  return !!dateString ?
    `Created: ${new Date(Date.parse(dateString)).toLocaleDateString()}` : ''
}
