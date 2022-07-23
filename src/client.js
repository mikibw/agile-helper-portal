const localStorageKey = "__auth_provider_token__";
const saveToken = (token) => {
  window.localStorage.setItem(localStorageKey, token);
};
async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

async function client(
  endpoint,
  { data, headers: customHeaders, ...customConfig } = {}
) {
  const token = await getToken();
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(endpoint, config).then(async (response) => {
    if (response.status === 401) {
      window.localStorage.clear();
      window.location.assign(window.location);
      return Promise.reject({ message: "Please re-authenticate." });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client, saveToken };
