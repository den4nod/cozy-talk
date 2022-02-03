import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActions, Container } from '@mui/material'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { EDIT_ARTICLE_PAGE_TITLE } from '../../constants'
import ArticleFormContainer from '../../containers/forms/articleForm'

export function Post({ postId, postBody, dateCreated }) {
  const [isEditing, setIsEditing] = useState(false)
  const [articleId, setArticleId] = useState(postId)
  const [articleBody, setArticleBody] = useState(postBody)

  const setUnderEdition = () => {
    setIsEditing(true)
  }

  return (
    <>
      {isEditing === false && <Container maxWidth='sm' sx={{ textAlign: 'center', mb: 2 }}>
        <Card variant='outlined'>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {articleBody}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {dateCreated}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Button onClick={setUnderEdition}>Edit</Button>
          </CardActions>
        </Card>
      </Container>}
      {isEditing === true && <ArticleFormContainer
        articleId={articleId}
        articleBody={articleBody}
        updateArticleBody={setArticleBody}
        updateIsEditing={setIsEditing}
        pageTitle={EDIT_ARTICLE_PAGE_TITLE}
      />}
    </>
  )
}

Post.propTypes = {
  postBody: PropTypes.string.isRequired,
  dateCreated: PropTypes.string
}

Post.defaultProps = {
  dateCreated: ''
}
