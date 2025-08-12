import React, { useState, useEffect } from "react";

// ======== FAKE API simulée ==========
const fakeApi = {
  users: [],
  tasks: [],
  register(name, email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.users.some((u) => u.email === email)) {
          resolve({ error: "Cet email est déjà utilisé." });
        } else {
          this.users.push({ name, email, password });
          resolve({ message: "Inscription réussie" });
        }
      }, 500);
    });
  },
  login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          resolve({ token: "fake-jwt-token", name: user.name });
        } else {
          resolve({ message: "Email ou mot de passe incorrect" });
        }
      }, 500);
    });
  },
  getTasks() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.tasks), 300);
    });
  },
  createTask(task) {
    return new Promise((resolve) => {
      const newTask = { ...task, id: Date.now() };
      this.tasks.push(newTask);
      setTimeout(() => resolve(newTask), 300);
    });
  },
  updateTask(id, updated) {
    return new Promise((resolve) => {
      this.tasks = this.tasks.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      );
      setTimeout(() => resolve(this.tasks.find((t) => t.id === id)), 300);
    });
  },
  deleteTask(id) {
    return new Promise((resolve) => {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      setTimeout(() => resolve({ success: true }), 300);
    });
  },
};

// ======== Composant Navbar ==========
function Navbar({ onLogout, userName }) {
  return (
    <nav
      style={{
        backgroundColor: "#007BFF",
        padding: "10px 20px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1.2rem",
        marginBottom: 20,
        borderRadius: 6,
      }}
    >
      <div>Mon App Tâches - Bonjour {userName}</div>
      <button
        onClick={() => {
          if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
            onLogout();
          }
        }}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Déconnexion
      </button>
    </nav>
  );
}

// ======== Login ==========
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await fakeApi.login(email, password);
    if (result.token) {
      onLogin(result.token, result.name);
    } else {
      setError(result.message || "Erreur de connexion");
    }
  };

  return (
    <div
      style={{
        maxWidth: 350,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007BFF",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Se connecter
        </button>
        {error && (
          <p style={{ color: "red", marginTop: 15, textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

// ======== Register ==========
function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const result = await fakeApi.register(name, email, password);
    if (result.message) {
      setSuccess("Inscription réussie ! Vous pouvez vous connecter.");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        onRegister();
      }, 1500);
    } else {
      setError(result.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <div
      style={{
        maxWidth: 350,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007BFF",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          S'inscrire
        </button>
        {success && (
          <p style={{ color: "green", marginTop: 15, textAlign: "center" }}>
            {success}
          </p>
        )}
        {error && (
          <p style={{ color: "red", marginTop: 15, textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

// ======== TaskForm ==========
function TaskForm({ onSave, editingTask, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setStatus(editingTask.status || "pending");
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : "");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setStatus("pending");
      setDueDate("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Le titre est obligatoire");
      return;
    }
    onSave({ title, status, dueDate, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 20,
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 6,
        backgroundColor: "#fff",
      }}
    >
      <h3>{editingTask ? "Modifier une tâche" : "Ajouter une tâche"}</h3>

      <div style={{ marginBottom: 10 }}>
        <label>Titre :</label>
        <br />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: 5 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Statut :</label>
        <br />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{ width: "100%", padding: 5 }}
        >
          <option value="pending">En attente</option>
          <option value="in-progress">En cours</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Date limite :</label>
        <br />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: "100%", padding: 5 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Description :</label>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: 5 }}
        />
      </div>

      <button type="submit" style={{ padding: "5px 10px" }}>
        {editingTask ? "Mettre à jour" : "Enregistrer"}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={cancelEdit}
          style={{ padding: "5px 10px", marginLeft: 10, background: "#ccc" }}
        >
          Annuler
        </button>
      )}
    </form>
  );
}

// ======== TaskList ==========
const statusColors = {
  pending: "#f0ad4e",
  "in-progress": "#0275d8",
  done: "#5cb85c",
};

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#007BFF", color: "#fff", textAlign: "left" }}>
          <th style={{ padding: "10px" }}>Titre</th>
          <th style={{ padding: "10px" }}>Statut</th>
          <th style={{ padding: "10px" }}>Date limite</th>
          <th style={{ padding: "10px" }}>Description</th>
          <th style={{ padding: "10px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <tr
              key={task.id}
              style={{
                borderBottom: "1px solid #ddd",
                transition: "background-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <td style={{ padding: "8px" }}>{task.title || "Titre manquant"}</td>
              <td style={{ padding: "8px" }}>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: 12,
                    color: "#fff",
                    backgroundColor: statusColors[task.status] || "#6c757d",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: "0.9rem",
                    display: "inline-block",
                    minWidth: 90,
                    textAlign: "center",
                  }}
                >
                  {task.status || "Statut manquant"}
                </span>
              </td>
              <td style={{ padding: "8px" }}>
                {task.dueDate ? task.dueDate.substring(0, 10) : "Date manquante"}
              </td>
              <td style={{ padding: "8px" }}>{task.description || "Description manquante"}</td>
              <td style={{ padding: "8px" }}>
                <button
                  onClick={() => onEdit(task)}
                  style={{
                    cursor: "pointer",
                    marginRight: 8,
                    backgroundColor: "#ffc107",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                  }}
                  title="Modifier"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Confirmer la suppression ?")) onDelete(task.id);
                  }}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#dc3545",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                    color: "#fff",
                  }}
                  title="Supprimer"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
              Aucune tâche disponible
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

// ======== APP PRINCIPAL ==========
export default function App() {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [view, setView] = useState("login"); // login | register | dashboard

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Charger les tâches quand on est connecté et sur dashboard
  useEffect(() => {
    if (token && view === "dashboard") {
      fakeApi.getTasks().then(setTasks);
    }
  }, [token, view]);

  // Connexion réussie
  const handleLogin = (jwt, name) => {
    setToken(jwt);
    setUserName(name);
    setView("dashboard");
  };

  // Déconnexion
  const handleLogout = () => {
    setToken("");
    setUserName("");
    setTasks([]);
    setEditingTask(null);
    setView("login");
  };

  // Enregistrer / modifier tâche
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      fakeApi.updateTask(editingTask.id, taskData).then((updated) => {
        setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTask(null);
      });
    } else {
      fakeApi.createTask(taskData).then((newTask) => {
        setTasks([...tasks, newTask]);
      });
    }
  };

  // Supprimer tâche
  const handleDeleteTask = (id) => {
    fakeApi.deleteTask(id).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
      if (editingTask && editingTask.id === id) {
        setEditingTask(null);
      }
    });
  };

  if (view === "login") {
    return (
      <>
        <Login onLogin={handleLogin} />
        <p style={{ textAlign: "center" }}>
          Pas encore de compte ?{" "}
          <button
            onClick={() => setView("register")}
            style={{
              color: "blue",
              cursor: "pointer",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            Inscrivez-vous
          </button>
        </p>
      </>
    );
  }

  if (view === "register") {
    return (
      <>
        <Register onRegister={() => setView("login")} />
        <p style={{ textAlign: "center" }}>
          Déjà un compte ?{" "}
          <button
            onClick={() => setView("login")}
            style={{
              color: "blue",
              cursor: "pointer",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            Connectez-vous
          </button>
        </p>
      </>
    );
  }

  if (view === "dashboard") {
    return (
      <div
        style={{
          maxWidth: 900,
          margin: "auto",
          padding: 20,
                   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Navbar onLogout={handleLogout} userName={userName} />

        <TaskForm
          onSave={handleSaveTask}
          editingTask={editingTask}
          cancelEdit={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </div>
    );
  }

  return null; // fallback, ne devrait jamais arriver
}

