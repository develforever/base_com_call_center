import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const message = error.response?.data?.message || 'Wystąpił nieoczekiwany błąd'
    console.error(`[API Error]: ${message}`)
    return Promise.reject(error)
  },
)

export default apiClient
