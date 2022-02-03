import { Post } from '../../components/post/post'
import { useQuery } from 'react-query'
import { Loading } from '../../components/pages/loading'
import { Error } from '../../components/pages/error'
import { getArticles } from './api/articlesCrud'

export function PostContainer() {
  const { isFetching, isLoading, isError, error, data } =
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
            postId={article_id}
            postBody={article_body}
            dateCreated={formatDateFromString(date_created)}
          />)
        )
      )}
    </>
  )
}

const formatDateFromString = (dateString) => {
  return !!dateString ?
    `Created: ${new Date(Date.parse(dateString)).toLocaleDateString()}` : ''
}
