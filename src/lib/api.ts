const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://lpress-backend.onrender.com/api/v1";
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET ;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "x-admin-secret": ADMIN_SECRET, // Always include admin secret for all requests
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.message || "Request failed");
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Network error occurred");
  }
}

export const newsApi = {
  getAll: (limit = 50, offset = 0) =>
    apiRequest<any[]>(`/news?limit=${limit}&offset=${offset}`),

  getById: (id: string) => apiRequest<any>(`/news/${id}`),

  create: async (data: FormData | any) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      headers: {
        "x-admin-secret": ADMIN_SECRET,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: string, data: FormData | any) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "PUT",
      headers: {
        "x-admin-secret": ADMIN_SECRET,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });
    return response.json();
  },

  delete: (id: string) => apiRequest(`/news/${id}`, { method: "DELETE" }),

  uploadImages: async (
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<string[]>> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(
            new ApiError(
              xhr.status,
              JSON.parse(xhr.responseText).message || "Upload failed"
            )
          );
        }
      });

      xhr.addEventListener("error", () => {
        reject(new ApiError(500, "Network error during upload"));
      });

      xhr.open("POST", `${API_BASE_URL}/news/upload`);
      xhr.setRequestHeader("x-admin-secret", ADMIN_SECRET);
      xhr.send(formData);
    });
  },
};

export const projectsApi = {
  getAll: (status?: string, limit = 50, offset = 0) => {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });
    if (status) params.append("status", status);
    return apiRequest<any[]>(`/projects?${params}`);
  },

  getById: (id: string) => apiRequest<any>(`/projects/${id}`),

  create: async (data: FormData | any) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "x-admin-secret": ADMIN_SECRET,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: string, data: FormData | any) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "x-admin-secret": ADMIN_SECRET,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });
    return response.json();
  },

  delete: (id: string) => apiRequest(`/projects/${id}`, { method: "DELETE" }),

  uploadImages: async (
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<string[]>> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(
            new ApiError(
              xhr.status,
              JSON.parse(xhr.responseText).message || "Upload failed"
            )
          );
        }
      });

      xhr.addEventListener("error", () => {
        reject(new ApiError(500, "Network error during upload"));
      });

      xhr.open("POST", `${API_BASE_URL}/projects/upload`);
      xhr.setRequestHeader("x-admin-secret", ADMIN_SECRET);
      xhr.send(formData);
    });
  },
};

export const complaintsApi = {
  getAll: (limit = 50, offset = 0) =>
    apiRequest<any[]>(`/complaints?limit=${limit}&offset=${offset}`),

  getById: (id: string) => apiRequest<any>(`/complaints/${id}`),

  delete: (id: string) => apiRequest(`/complaints/${id}`, { method: "DELETE" }),
};

export const subscribersApi = {
  getAll: (subscribed?: boolean, limit = 50, offset = 0) => {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });
    if (subscribed !== undefined)
      params.append("subscribed", String(subscribed));
    return apiRequest<any[]>(`/subscribers?${params}`);
  },

  getCount: (subscribed = true) =>
    apiRequest<{ count: number }>(
      `/subscribers/count?subscribed=${subscribed}`
    ),

  subscribe: (email: string) =>
    apiRequest(`/subscribers/subscribe`, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  unsubscribe: (email: string) =>
    apiRequest(`/subscribers/unsubscribe`, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  delete: (id: string) =>
    apiRequest(`/subscribers/${id}`, { method: "DELETE" }),
};

export const newsletterApi = {
  send: async (data: {
    subject: string;
    htmlContent: string;
    recipientType: "all" | "test";
    testEmail?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/newsletter/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": ADMIN_SECRET,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getTemplates: () => apiRequest<any[]>("/newsletter/templates"),

  createTemplate: (data: any) =>
    apiRequest("/newsletter/templates", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateTemplate: (id: string, data: any) =>
    apiRequest(`/newsletter/templates/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteTemplate: (id: string) =>
    apiRequest(`/newsletter/templates/${id}`, { method: "DELETE" }),
};

export { ApiError };
