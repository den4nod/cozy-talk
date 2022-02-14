import { apiClient } from '../../../config/axios'
import { API_ENDPOINTS } from '../../../constants'

export const getUsers = async () => {
  return apiClient.get(API_ENDPOINTS.USERS)
}

export const getUserById = async (userId) => {
  return apiClient.get(API_ENDPOINTS.USERS + `/${userId}`)
}

export const updateUser = async (userId, user) => {
  return apiClient.put(`${API_ENDPOINTS.USERS}/${userId}`, user)
}

export const updateUserAvatar = async (userId, avatar) => {
  return apiClient.post(`${API_ENDPOINTS.USERS}/${userId}/avatar`, avatar)
}
