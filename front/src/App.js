import './App.css'
import { HeaderContainer } from './containers/header/header'
import { BodyContainer } from './containers/body/body'
import { useState } from 'react'
import Divider from '@mui/material/Divider'

function App() {

  const [page, setPage] = useState('articles')
  const [pageTitle, setPageTitle] = useState('Articles')

  return (
    <div className='App'>
      <HeaderContainer page={page} onPageChange={setPage} onPageTitleChange={setPageTitle} />
      <Divider />
      <BodyContainer page={page} pageTitle={pageTitle} />
    </div>
  )
}

export default App
