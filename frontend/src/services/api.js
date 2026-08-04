const API_BASE_URL = "http://localhost:8080";

function getToken() {
  const directToken = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (directToken && !directToken.startsWith("{")) return directToken;

  const savedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (!savedUser) return null;

  try {
    const parsed = JSON.parse(savedUser);
    return parsed.token || parsed.jwtToken || parsed.accessToken || parsed.user?.token || null;
  } catch (e) {
    console.error("Error parsing saved user token", e);
    return null;
  }
}

function buildUrl(url, params) {
  let fullUrl = url;
  if (!url.startsWith("http")) {
    let baseUrl = "http://localhost:8080";
    if (
      url.startsWith("/api/enrollments") ||
      url.startsWith("/api/payments") ||
      url.startsWith("/api/reviews") ||
      url.startsWith("/api/dashboard")
    ) {
      baseUrl = "http://localhost:8082";
    }
    fullUrl = `${baseUrl}${url}`;
  }

  if (!params || Object.keys(params).length === 0) {
    return fullUrl;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${fullUrl}?${queryString}` : fullUrl;
}

async function request(method, url, { params, body } = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions = {
    method,
    headers,
  };

  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const fullUrl = buildUrl(url, params);

  let res;
  try {
    res = await fetch(fullUrl, fetchOptions);
  } catch (networkError) {
    console.error("API Fetch Error for URL:", fullUrl, networkError);
    const err = new Error(networkError.message || "Network Error");
    err.response = null;
    throw err;
  }

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
  }

  if (!res.ok) {
    const err = new Error(
      (data && data.message) || `Request failed with status ${res.status}`
    );
    err.response = { data, status: res.status };
    throw err;
  }

  return { data, status: res.status };
}

const api = {
  get: (url, config = {}) => request("GET", url, { params: config.params }),
  post: (url, body) => request("POST", url, { body }),
  put: (url, body) => request("PUT", url, { body }),
  delete: (url) => request("DELETE", url),
};

export default api;