import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState('login'); // login | register | tasks

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setView('tasks');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setView('login');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
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

      {token && view === 'tasks' && (
        <>
          <button onClick={handleLogout}>Déconnexion</button>
          <TaskForm token={token} />
          <TaskList token={token} />
        </>
      )}
    </div>
  );
}
