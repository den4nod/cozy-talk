import * as yup from 'yup'
import ArticleForm from '../../components/forms/articleForm'
import { useMutation } from 'react-query'
import { createArticle, updateArticle } from '../post/api/articlesCrud'
import { availabilityStatuses, theme } from '../../constants'
import PropTypes from 'prop-types'

const ArticleFormContainer = ({pageTitle, articleId, articleBody, updateArticleBody, updateIsEditing}) => {

  const mutation = articleId ?
    useMutation((article) =>
      updateArticle(articleId, article),
    {
      onSuccess: (data, article) => {
        updateArticleBody(article.articleBody)
        updateIsEditing(false)
      }
    }) : 
    useMutation((article) => createArticle(article))

  const stopEditionOnCancel = () => {
    updateIsEditing(false)
  }

  const onFormSubmit = (values, { setSubmitting, resetForm }) => {
    const article = {
      articleBody: values.article,
      // userId is hardcoded for now, later we will pick it up from authorization
      userId: '2b026b11-a5b5-407e-a01a-9cabb748dea8'
    }
    // later on success or on error add Mui Snackbar
    mutation.mutate(article)
    resetForm()
    setSubmitting(false)
  }

  const schema = yup.object().shape({
    article: yup.string().required('Article text is required'),
    article_availability: yup.string().required('Availability status is required')
  })

  const defaultAvailabilityStatusValue = availabilityStatuses
    .find(status => status.label.toLowerCase() === 'all').value;

  const setInitialValues = (article, availabilityStatus) => {
    return {
      article: article,
      article_availability: availabilityStatus
    }
  }

  const initialValues = articleId ?
    setInitialValues(articleBody, defaultAvailabilityStatusValue) :
    setInitialValues('', defaultAvailabilityStatusValue)

  return <ArticleForm
    availabilityStatuses={availabilityStatuses}
    schema={schema}
    initialValues={initialValues}
    theme={theme}
    onArticleSubmit={onFormSubmit}
    onCancel={stopEditionOnCancel}
    title={pageTitle}
    submitButtonText={articleId ? 'Edit' : 'Add'}
    showCancel={!!articleId}
  />
}

ArticleFormContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  articleId: PropTypes.string,
  articleBody: PropTypes.string,
  updateArticleBody: PropTypes.func,
  updateIsEditing: PropTypes.func
}

export default ArticleFormContainer
