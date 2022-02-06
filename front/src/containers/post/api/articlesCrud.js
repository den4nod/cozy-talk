import { apiClient } from '../../../config/axios'
import { API_ENDPOINTS } from '../../../constants'

export const getArticles = async () => {
  return apiClient.get(API_ENDPOINTS.ARTICLES)
}

export const createArticle = async (article) => {
  return apiClient.post(API_ENDPOINTS.ARTICLES, article)
}

export const updateArticle = async (articleId, article) => {
  return apiClient.put(`${API_ENDPOINTS.ARTICLES}/${articleId}`, article)
}

export const getArticle = async (articleId) => {
  return apiClient.get(`${API_ENDPOINTS.ARTICLES}/${articleId}`)
}
