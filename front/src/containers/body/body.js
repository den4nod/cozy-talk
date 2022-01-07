import { Articles } from '../../components/articles/articles'
import { AddArticle } from '../../components/articles/addArticle'
import { Profile } from '../../components/profile/profile'
import { ADD_ARTICLE_PAGE, ARTICLES_PAGE, PROFILE_PAGE } from '../../constants'

export function BodyContainer({ page, pageTitle }) {
  return (
    <div>
      {page === ARTICLES_PAGE && <Articles pageTitle={pageTitle} />}
      {page === ADD_ARTICLE_PAGE && <AddArticle pageTitle={pageTitle} />}
      {page === PROFILE_PAGE && <Profile pageTitle={pageTitle} />}
    </div>
  )
}
