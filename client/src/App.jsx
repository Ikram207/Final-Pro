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

// ======== Navbar ==========
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
function Login({ onLogin, goRegister }) {
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
        backgroundColor: "#f9f9f9",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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

      {/* Lien vers inscription */}
      <p style={{ textAlign: "center", marginTop: 15 }}>
        Pas de compte ?{" "}
        <span
          onClick={goRegister}
          style={{ color: "#007BFF", cursor: "pointer", textDecoration: "underline" }}
        >
          Inscrivez-vous
        </span>
      </p>
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
        backgroundColor: "#f9f9f9",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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

// ======== TaskForm ========
function TaskForm({ onSave, editingTask, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
      setDescription(editingTask.description);
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
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, padding: 15, border: "1px solid #ccc", borderRadius: 6, backgroundColor: "#fff" }}>
      <h3>{editingTask ? "Modifier une tâche" : "Ajouter une tâche"}</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }}>
        <option value="pending">En attente</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminé</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <button type="submit" style={{ padding: 8, backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: 4, marginRight: 5 }}>
        {editingTask ? "Modifier" : "Ajouter"}
      </button>
      {editingTask && <button type="button" onClick={cancelEdit} style={{ padding: 8, backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: 4 }}>Annuler</button>}
    </form>
  );
}

// ======== TaskList ==========
const statusColors = { pending: "#f0ad4e", "in-progress": "#0275d8", done: "#5cb85c" };
function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
      <thead>
        <tr style={{ backgroundColor: "#007BFF", color: "#fff", textAlign: "left" }}>
          <th style={{ padding: 10 }}>Titre</th>
          <th style={{ padding: 10 }}>Statut</th>
          <th style={{ padding: 10 }}>Date limite</th>
          <th style={{ padding: 10 }}>Description</th>
          <th style={{ padding: 10 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length > 0 ? tasks.map((task) => (
          <tr key={task.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: 8 }}>{task.title}</td>
            <td style={{ padding: 8, color: statusColors[task.status] }}>{task.status}</td>
            <td style={{ padding: 8 }}>{task.dueDate}</td>
            <td style={{ padding: 8 }}>{task.description}</td>
            <td style={{ padding: 8 }}>
              <button onClick={() => onEdit(task)} style={{ marginRight: 5 }}>✏️</button>
              <button onClick={() => { if(window.confirm("Supprimer cette tâche ?")) onDelete(task.id); }}>🗑️</button>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: 10 }}>Aucune tâche</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

// ======== TaskFilter ==========
function TaskFilter({ onFilterChange }) {
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    onFilterChange({ status, sort });
  }, [status, sort]);

  return (
    <div style={{ marginBottom: 20 }}>
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: 6, marginRight: 10 }}>
        <option value="">Tous les statuts</option>
        <option value="pending">En attente</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminé</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: 6 }}>
        <option value="">Tri par défaut</option>
        <option value="asc">Date croissante</option>
        <option value="desc">Date décroissante</option>
      </select>
    </div>
  );
}

// ======== App ==========
export default function App() {
  const [view, setView] = useState("login"); // login, register, dashboard
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks
    .filter((t) => !filters.status || t.status === filters.status)
    .sort((a, b) => {
      if (filters.sort === "asc") return new Date(a.dueDate) - new Date(b.dueDate);
      if (filters.sort === "desc") return new Date(b.dueDate) - new Date(a.dueDate);
      return 0;
    });

  const addTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...task, id: t.id } : t)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // --- Vues ---
  if (view === "login") {
    return (
      <Login
        onLogin={(token, name) => { setUser(name); setView("dashboard"); }}
        goRegister={() => setView("register")}
      />
    );
  }

  if (view === "register") {
    return <Register onRegister={() => setView("login")} />;
  }

  if (view === "dashboard") {
    return (
      <div style={{ padding: 20 }}>
        <Navbar userName={user} onLogout={() => setView("login")} />
        <TaskFilter onFilterChange={setFilters} />
        <TaskForm
          onSave={addTask}
          editingTask={editingTask}
          cancelEdit={() => setEditingTask(null)}
        />
        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      </div>
    );
  }

  return null;
}
