const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

interface ApiRequestOptions extends RequestInit {
  authToken?: string | null;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { authToken, headers, ...requestOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...requestOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? "Something went wrong",
      response.status,
      data?.code,
    );
  }

  return data as T;
}