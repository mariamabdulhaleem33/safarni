import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from "axios"
import { toast } from "react-hot-toast"

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

// request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<{ Status?: boolean; message?: string }>) => {
    console.log(error)
    if (error.response) {
      const { status, config, data } = error.response
      const isLogoutRequest = config?.url?.includes("/logout")

      if (status === 401 && !isLogoutRequest) {
        localStorage.removeItem("authToken")
        window.location.href = "/login"
      }
      if (status === 403) {
        toast.error(
          data?.message || "Access forbidden. Insufficient permissions."
        )
      }
      if (status === 422) {
        toast.error(data?.message || "Email is already been taken.")
      }

      if (status >= 500) {
        toast.error(data?.message || "Server error. Please try again later.")
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.")
    }

    return Promise.reject(error)
  }
)
export default api
