import * as yup from 'yup'
import ArticleForm from '../../components/forms/articleForm'
import { useMutation } from 'react-query'
import {
  createArticleFormData,
  updateArticle
} from '../post/api/articlesCrud'
import { availabilityStatuses, theme } from '../../constants'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { dataUrlToFile } from '../../utils'

const ArticleFormContainer = ({ pageTitle, article, setArticle, updateIsEditing }) => {

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

  const [imgFilename, setImgFilename] = useState('image.jpeg');

  const handleImageChange = e => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match('image.*') && file.size < 10000000) {
      setImgFilename(file.name)
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      }
      reader.readAsDataURL(file);
    } else {
      console.error('Wrong file format or size!');
    }
  }

  const cropImage = () => {
    if (typeof cropper !== 'undefined') {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  }

  const deleteImage = () => {
    setCroppedImage(null);
    setImage(null);
  }

  const mutation = article ?
    useMutation((articlePayload) =>
      updateArticle(article.article_id, articlePayload),
    {
      onSuccess: (data, articlePayload) => {
        const updatedArticle = {
          article_id: article.article_id,
          article_body: articlePayload.articleBody,
          user_id: articlePayload.userId,
          article_visibility_status_id: articlePayload.articleVisibilityStatusId,
        }
        setArticle(updatedArticle)
        updateIsEditing(false)
      }
    }) :
    useMutation((articlePayload) => {
      createArticleFormData(articlePayload)
    })

  const stopEditionOnCancel = () => {
    updateIsEditing(false)
  }

  const onFormSubmit = (values, { setSubmitting, resetForm }) => {
    const articlePayload = {
      articleBody: values.article,
      articleVisibilityStatusId: values.article_availability.id,
      // userId is hardcoded for now, later we will pick it up from authorization
      userId: '2b026b11-a5b5-407e-a01a-9cabb748dea8'
    }
    // later on success or on error add Mui Snackbar
    if (croppedImage) {
      mutation.mutate({...articlePayload, articleImage: dataUrlToFile(croppedImage, imgFilename)})
    } else {
      mutation.mutate(articlePayload)
    }
    resetForm()
    deleteImage()
    setSubmitting(false)
  }

  const schema = yup.object().shape({
    article: yup.string().required('Article text is required'),
    article_availability: yup.object().required('Availability status is required')
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
    // image props
    image={image}
    handleImageChange={handleImageChange}
    setCropper={setCropper}
    cropImage={cropImage}
    croppedImage={croppedImage}
    deleteImage={deleteImage}
    // image from backend
    userImage={article ? article.article_image_path : undefined}
  />
}

ArticleFormContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  article: PropTypes.object,
  setArticle: PropTypes.func,
  updateIsEditing: PropTypes.func
}

export default ArticleFormContainer
