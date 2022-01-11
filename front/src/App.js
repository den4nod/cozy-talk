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

function App() {

  const ROUTES = {
    ARTICLES: '/' + ARTICLES_PAGE,
    ADD_ARTICLE: '/' + ADD_ARTICLE_PAGE,
    PROFILE: '/' + PROFILE_PAGE
  }

  const [page, setPage] = useState(ARTICLES_PAGE)
  const [pageTitle, setPageTitle] = useState(ARTICLES_PAGE_TITLE)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={
          <div className='App'>
            <HeaderContainer page={page} onPageChange={setPage} onPageTitleChange={setPageTitle} />
            <Divider />
            <BodyContainer page={page} pageTitle={pageTitle} />
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
      </Routes>

    </BrowserRouter>
  )
}

export default App
