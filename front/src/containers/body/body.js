import { Articles } from '../../components/articles/articles'
import { AddArticle } from '../../components/articles/addArticle'
import { Profile } from '../../components/profile/profile'

export function BodyContainer({ page, pageTitle }) {
  return (
    <div>
      {page === 'articles' && <Articles pageTitle={pageTitle} />}
      {page === 'addArticle' && <AddArticle pageTitle={pageTitle} />}
      {page === 'profile' && <Profile pageTitle={pageTitle} />}
    </div>
  )
}
