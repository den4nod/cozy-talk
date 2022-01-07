import './App.css'
import { HeaderContainer } from './containers/header/header'
import { BodyContainer } from './containers/body/body'
import { useState } from 'react'
import Divider from '@mui/material/Divider'
import { ARTICLES_PAGE, ARTICLES_PAGE_TITLE } from './constants'

function App() {

  const [page, setPage] = useState(ARTICLES_PAGE)
  const [pageTitle, setPageTitle] = useState(ARTICLES_PAGE_TITLE)

  return (
    <div className='App'>
      <HeaderContainer page={page} onPageChange={setPage} onPageTitleChange={setPageTitle} />
      <Divider />
      <BodyContainer page={page} pageTitle={pageTitle} />
    </div>
  )
}

export default App
