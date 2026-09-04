import axios from "axios";


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function toApiError(error: unknown, fallback: string): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const body = error.response?.data as ApiResponse<unknown> | undefined;
    const message = body?.error ?? error.message ?? fallback;
    return new ApiError(message, status);
  }
  if (error instanceof Error) return new ApiError(error.message, 0);
  return new ApiError(fallback, 0);
}

export async function axiosGet<T>(path: string): Promise<T> {
  try {
    const response = await api.get<ApiResponse<T>>(path);
    if (!response.data.success) {
      throw new ApiError(response.data.error ?? "Request failed", response.status);
    }
    return response.data.data as T;
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while fetching data");
  }
}

export async function axiosPost<TRequest, TResponse>(
  path: string,
  dto: TRequest
): Promise<TResponse> {
  try {
    const response = await api.post<ApiResponse<TResponse>>(path, dto);
    if (!response.data.success) {
      throw new ApiError(response.data.error ?? "Request failed", response.status);
    }
    return response.data.data as TResponse;
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while posting data");
  }
}

export async function axiosPut<TRequest, TResponse>(
  path: string,
  dto?: TRequest
): Promise<TResponse> {
  try {
    const response = await api.put<ApiResponse<TResponse>>(path, dto);
    if (!response.data.success) {
      throw new ApiError(response.data.error ?? "Request failed", response.status);
    }
    return response.data.data as TResponse;
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while updating data");
  }
}

export async function axiosDelete<T>(path: string): Promise<T> {
  try {
    const response = await api.delete<ApiResponse<T>>(path);
    if (!response.data.success) {
      throw new ApiError(response.data.error ?? "Request failed", response.status);
    }
    return response.data.data as T;
  } catch (error) {
    throw toApiError(error, "An unknown error occurred while deleting the resource");
  }
}
