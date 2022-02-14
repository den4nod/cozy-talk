import { apiClient } from '../../../config/axios'
import { API_ENDPOINTS } from '../../../constants'
import { serialize } from 'object-to-formdata'

export const getArticles = async () => {
  return apiClient.get(API_ENDPOINTS.ARTICLES)
}

export const createArticle = async (article) => {
  return apiClient.post(API_ENDPOINTS.ARTICLES, article)
}

export const createArticleFormData = async (data) => {
  const formData = serialize(data, { indices: true })
  return apiClient.post(`${API_ENDPOINTS.ARTICLES}/form`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateArticleFormData = async (articleId, data) => {
  const formData = serialize(data, { indices: true })
  return apiClient.put(`${API_ENDPOINTS.ARTICLES}/form/${articleId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateArticle = async (articleId, article) => {
  return apiClient.put(`${API_ENDPOINTS.ARTICLES}/${articleId}`, article)
}

export const getArticle = async (articleId) => {
  return apiClient.get(`${API_ENDPOINTS.ARTICLES}/${articleId}`)
}

export class createArticleFromFormData {
}
