import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import IdeaForm from './components/IdeaForm';
import IdeaTable from './components/IdeaTable';
import IdeaDetailsBox from './components/IdeaDetailsBox';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState(token ? 'ideas' : 'login'); // login | register | ideas
  const [ideas, setIdeas] = useState([]);
  const [editingIdea, setEditingIdea] = useState(null);
  const [showDetailsIdea, setShowDetailsIdea] = useState(null);

  // Chargement des idées depuis backend
  const fetchIdeas = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/ideas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setIdeas(data);
      } else {
        alert('Erreur lors du chargement des idées');
      }
    } catch (err) {
      alert('Erreur réseau');
    }
  };

  useEffect(() => {
    if (token) {
      setView('ideas');
      fetchIdeas();
    } else {
      setView('login');
    }
  }, [token]);

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setView('ideas');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setView('login');
    setIdeas([]);
    setEditingIdea(null);
    setShowDetailsIdea(null);
  };

  // Sauvegarder une idée (ajout ou modification)
  const saveIdea = async (ideaData) => {
    const method = editingIdea ? 'PUT' : 'POST';
    const url = editingIdea ? `/api/ideas/${editingIdea._id}` : '/api/ideas';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ideaData),
      });
      if (res.ok) {
        fetchIdeas();
        setEditingIdea(null);
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch {
      alert('Erreur réseau');
    }
  };

  // Supprimer une idée
  const deleteIdea = async (id) => {
    if (!window.confirm('Supprimer cette idée ?')) return;
    try {
      const res = await fetch(`/api/ideas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchIdeas();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch {
      alert('Erreur réseau');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      {!token && view === 'login' && (
        <>
          <Login onLogin={handleLogin} />
          <p>
            Pas de compte ?{' '}
            <button onClick={() => setView('register')}>Inscrivez-vous</button>
          </p>
        </>
      )}

      {!token && view === 'register' && (
        <>
          <Register onRegister={() => setView('login')} />
          <p>
            Déjà un compte ?{' '}
            <button onClick={() => setView('login')}>Connectez-vous</button>
          </p>
        </>
      )}

      {token && view === 'ideas' && (
        <>
          <Navbar setView={setView} />
          <button onClick={handleLogout} style={{ marginBottom: 20 }}>
            Déconnexion
          </button>
          <IdeaForm
            token={token}
            onSave={saveIdea}
            editingIdea={editingIdea}
            cancelEdit={() => setEditingIdea(null)}
          />
          <IdeaTable
            ideas={ideas}
            onEdit={setEditingIdea}
            onDelete={deleteIdea}
            onShowDetails={setShowDetailsIdea}
          />
          <IdeaDetailsBox idea={showDetailsIdea} onClose={() => setShowDetailsIdea(null)} />
        </>
      )}
    </div>
  );
}
