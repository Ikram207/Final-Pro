const API_URL = 'http://localhost:4000/api'; // adapte selon l’URL de ton backend

// Enregistrement utilisateur
export async function register(email, password) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// Connexion utilisateur
export async function login(email, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// Création d’une tâche
export async function createTask(token, taskData) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return res.json();
}

// Récupérer la liste des tâches
export async function getTasks(token) {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Modifier une tâche
export async function updateTask(token, id, updatedData) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  return res.json();
}

// Supprimer une tâche
export async function deleteTask(token, id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
