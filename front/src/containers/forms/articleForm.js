import * as yup from 'yup'
import ArticleForm from '../../components/forms/articleForm'
import { useMutation } from 'react-query'
import { createArticle, updateArticle } from '../post/api/articlesCrud'
import { availabilityStatuses, theme } from '../../constants'
import PropTypes from 'prop-types'

const ArticleFormContainer = ({ pageTitle, article, setArticle, updateIsEditing }) => {

  const mutation = article ?
    useMutation((articlePayload) =>
      updateArticle(article.article_id, articlePayload),
    {
      onSuccess: (data, articlePayload) => {
        const updatedArticle = {
          article_id: article.article_id,
          article_body: articlePayload.articleBody,
          user_id: articlePayload.userId,
          // article_image_path: articlePayload.articleImagePath,
          article_visibility_status_id: articlePayload.articleVisibilityStatusId,
        }
        setArticle(updatedArticle)
        updateIsEditing(false)
      }
    }) :
    useMutation((articlePayload) => createArticle(articlePayload))

  const stopEditionOnCancel = () => {
    updateIsEditing(false)
  }

  const onFormSubmit = (values, { setSubmitting, resetForm }) => {
    const articlePayload = {
      articleBody: values.article,
      articleVisibilityStatusId: values.article_availability.id,
      // todo: add articleImagePath
      // userId is hardcoded for now, later we will pick it up from authorization
      userId: '2b026b11-a5b5-407e-a01a-9cabb748dea8'
    }
    // later on success or on error add Mui Snackbar
    mutation.mutate(articlePayload)
    resetForm()
    setSubmitting(false)
  }

  const schema = yup.object().shape({
    article: yup.string().required('Article text is required'),
    article_availability: yup.object().required('Availability status is required')
    // todo: add articleImagePath
  })

  const defaultAvailabilityStatusValue = availabilityStatuses
    .find(status => status.label.toLowerCase() === 'all')

  const availabilityStatusBy = (id) => {
    if (id) {
      return availabilityStatuses
        .find(status => status.id === id)
    } else {
      return defaultAvailabilityStatusValue
    }
  }

  const setInitialValues = (article, availabilityStatus) => {
    // todo: add articleImagePath
    return {
      article: article,
      article_availability: availabilityStatus
    }
  }

  const initialValues = article ?
    setInitialValues(article.article_body, availabilityStatusBy(article.article_visibility_status_id)) :
    setInitialValues('', defaultAvailabilityStatusValue)

  return <ArticleForm
    availabilityStatuses={availabilityStatuses}
    schema={schema}
    initialValues={initialValues}
    theme={theme}
    onArticleSubmit={onFormSubmit}
    onCancel={stopEditionOnCancel}
    title={pageTitle}
    submitButtonText={article ? 'Edit' : 'Add'}
    showCancel={!!article}
  />
}

ArticleFormContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  article: PropTypes.object,
  setArticle: PropTypes.func,
  updateIsEditing: PropTypes.func
}

export default ArticleFormContainer
