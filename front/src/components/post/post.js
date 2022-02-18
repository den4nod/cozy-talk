import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActions, CardMedia, Container } from '@mui/material'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { EDIT_ARTICLE_PAGE_TITLE } from '../../constants'
import ArticleFormContainer from '../../containers/forms/articleForm'

export function Post({ articleInfo, dateCreated }) {

  const [isEditing, setIsEditing] = useState(false)
  const [article, setArticle] = useState(articleInfo)

  const setUnderEdition = () => {
    setIsEditing(true)
  }

  return (
    <>
      {isEditing === false && <Container maxWidth='sm' sx={{ textAlign: 'center', mb: 2 }}>
        <Card variant='outlined'>
          <CardContent>
            {article.article_image_path && <CardMedia
              component='img'
              style={{
                width: 'auto',
                maxHeight: '200px',
                margin: 'auto'
              }}
              image={`http://localhost:3090/files?img=${article.article_image_path}`}
              alt='Article image'
            />}
            <Typography gutterBottom variant='h5' component='div'>
              {article.article_body}
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
        article={article}
        setArticle={setArticle}
        updateIsEditing={setIsEditing}
        pageTitle={EDIT_ARTICLE_PAGE_TITLE}
      />}
    </>
  )
}

Post.propTypes = {
  articleInfo: PropTypes.shape({
    article_id: PropTypes.string,
    article_body: PropTypes.string,
    user_id: PropTypes.string,
    article_image_path: PropTypes.string,
    article_visibility_status_id: PropTypes.number,
    date_created: PropTypes.string,
    date_edited: PropTypes.string
  }),
  dateCreated: PropTypes.string
}

Post.defaultProps = {
  dateCreated: ''
}
