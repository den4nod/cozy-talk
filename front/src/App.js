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
  PROFILE_PAGE_TITLE, USER_PAGE_TITLE,
  USERS_PAGE,
  USERS_PAGE_TITLE
} from './constants'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Articles } from './components/articles/articles'
import { Profile } from './components/profile/profile'
import { NotFound } from './components/pages/notFound'
import { PostRouteContainer } from './containers/post/postRoute'
import { DateRouteContainer } from './containers/post/dateRoute'
import ErrorBoundary from './components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UsersPage } from './components/users/usersPage'
import { UserPage } from './components/users/userPage'
import ArticleFormContainer from './containers/forms/articleForm'
import authContext from './contexts/authContext'

function App() {

  const ROUTES = {
    ARTICLES: '/' + ARTICLES_PAGE,
    ADD_ARTICLE: '/' + ADD_ARTICLE_PAGE,
    PROFILE: '/' + PROFILE_PAGE,
    USERS: '/' + USERS_PAGE
  }

  const [page, setPage] = useState(ARTICLES_PAGE)
  const [pageTitle, setPageTitle] = useState(ARTICLES_PAGE_TITLE)

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <authContext.Provider value={{authenticated: false, accessToken: '', expiresIn: ''}}>
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
                <ArticleFormContainer pageTitle={ADD_ARTICLE_PAGE_TITLE} />
              } />
              <Route path={ROUTES.PROFILE} element={
                <Profile pageTitle={PROFILE_PAGE_TITLE} />
              } />
              <Route path={ROUTES.USERS} element={
                <UsersPage pageTitle={USERS_PAGE_TITLE} />
              } />
              <Route path={ROUTES.USERS + '/:userId'} element={
                <UserPage pageTitle={USER_PAGE_TITLE} />
              } />
              <Route path='/post/:id' element={<PostRouteContainer />} />
              <Route path='/post/*' element={<NotFound />} />
              <Route path='/date/:date' element={<DateRouteContainer />} />
              <Route path='/date/*' element={<NotFound />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </authContext.Provider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
