import axios, { AxiosError } from "axios";

type ApiError = {
  message: string;
  status?: number;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("notes_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const normalized: ApiError = {
      message: "Something went wrong. Please try again.",
      status: error.response?.status,
    };

    if (error.response?.data && typeof error.response.data === "object") {
      const data = error.response.data as { error?: string; message?: string };
      normalized.message = data.error || data.message || normalized.message;
    } else if (error.message) {
      normalized.message = error.message;
    }

    return Promise.reject(normalized);
  },
);

export default apiClient;
