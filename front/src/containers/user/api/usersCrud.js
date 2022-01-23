import { apiClient } from '../../../config/axios'
import { API_ENDPOINTS } from '../../../constants'

export const getUsers = async () => {
  return apiClient.get(API_ENDPOINTS.USERS)
}

export const getUserById = async (userId) => {
  return apiClient.get(API_ENDPOINTS.USERS + `/${userId}`)
}
