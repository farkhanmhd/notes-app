const ENDPOINT = "https://notes-api.dicoding.dev/v1";

const getAccessToken = () => localStorage.getItem("accessToken");

const putAccessToken = (accessToken) =>
  localStorage.setItem("accessToken", accessToken);

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function register({ name, email, password }) {
  const response = await fetch(`${ENDPOINT}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, responseJson };
  }

  return { error: false, responseJson };
}

async function login({ email, password }) {
  const response = await fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    const message = responseJson.message;
    return { error: true, data: message };
  }
  return { error: false, data: responseJson.data };
}

async function getUserLoggedIn() {
  const response = await fetchWithToken(`${ENDPOINT}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") return { error: true, data: null };
  return { error: false, data: responseJson.data };
}
async function getActiveNotes() {
  const response = await fetchWithToken(`${ENDPOINT}/notes`);
  const responseJson = await response.json();
  return responseJson.data;
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${ENDPOINT}/notes/archived`);
  const responseJson = await response.json();
  return responseJson.data;
}

async function getSingleNote(id) {
  const response = await fetchWithToken(`${ENDPOINT}/notes/${id}`);
  const responseJson = await response.json();
  return responseJson.data;
}

async function saveNote({ title, body }) {
  const response = await fetchWithToken(`${ENDPOINT}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") return { error: true };
  return { error: false };
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${ENDPOINT}/notes/${id}/archive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true };
  }
  return { error: false };
}

async function unArchiveNote(id) {
  const response = await fetchWithToken(`${ENDPOINT}/notes/${id}/unarchive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true };
  }
  return { error: false };
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${ENDPOINT}/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true };
  }
  return { error: false };
}

export {
  register,
  login,
  putAccessToken,
  getUserLoggedIn,
  getActiveNotes,
  getArchivedNotes,
  getSingleNote,
  saveNote,
  archiveNote,
  unArchiveNote,
  deleteNote,
};
