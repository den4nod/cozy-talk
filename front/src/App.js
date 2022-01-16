import './App.css'
import { HeaderContainer } from './containers/header/header'
import { BodyContainer } from './containers/body/body'
import { useState } from 'react'
import Divider from '@mui/material/Divider'
import {
  ADD_ARTICLE_PAGE,
  ADD_ARTICLE_PAGE_TITLE,
  ARTICLES_PAGE,
  ARTICLES_PAGE_TITLE,
  PROFILE_PAGE,
  PROFILE_PAGE_TITLE
} from './constants'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Articles } from './components/articles/articles'
import { AddArticle } from './components/articles/addArticle'
import { Profile } from './components/profile/profile'
import { NotFound } from './components/pages/notFound'
import { PostRouteContainer } from './containers/post/postRoute'
import { DateRouteContainer } from './containers/post/dateRoute'
import ErrorBoundary from './components/ErrorBoundary'

function App() {

  const ROUTES = {
    ARTICLES: '/' + ARTICLES_PAGE,
    ADD_ARTICLE: '/' + ADD_ARTICLE_PAGE,
    PROFILE: '/' + PROFILE_PAGE
  }

  const [page, setPage] = useState(ARTICLES_PAGE)
  const [pageTitle, setPageTitle] = useState(ARTICLES_PAGE_TITLE)

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div className='App'>
              <ErrorBoundary>
                <HeaderContainer page={page} onPageChange={setPage} onPageTitleChange={setPageTitle} />
              </ErrorBoundary>
              <Divider />
              <ErrorBoundary>
                <BodyContainer page={page} pageTitle={pageTitle} />
              </ErrorBoundary>
            </div>
          } />
          <Route path={ROUTES.ARTICLES} element={
            <Articles pageTitle={ARTICLES_PAGE_TITLE} />
          } />
          <Route path={ROUTES.ADD_ARTICLE} element={
            <AddArticle pageTitle={ADD_ARTICLE_PAGE_TITLE} />
          } />
          <Route path={ROUTES.PROFILE} element={
            <Profile pageTitle={PROFILE_PAGE_TITLE} />
          } />
          <Route path='/post/:id' element={<PostRouteContainer />} />
          <Route path='/post/*' element={<NotFound />} />
          <Route path='/date/:date' element={<DateRouteContainer />} />
          <Route path='/date/*' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
