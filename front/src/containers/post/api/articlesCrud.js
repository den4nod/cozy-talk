import { apiClient } from '../../../config/axios'
import { API_ENDPOINTS } from '../../../constants'

export const getArticles = async () => {
  return apiClient.get(API_ENDPOINTS.ARTICLES)
}
