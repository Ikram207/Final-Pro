import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState('login'); // login | register | tasks
  const [tasks, setTasks] = useState([]);

  const handleLogin = async (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setView('tasks');
    // Fetch tasks after login
    const { getTasks } = await import('./services/api');
    const fetched = await getTasks(jwt);
    setTasks(Array.isArray(fetched) ? fetched : []);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setTasks([]);
    setView('login');
  };

  // Listen for taskAdded event to refresh tasks
  React.useEffect(() => {
    if (!token || view !== 'tasks') return;
    const { getTasks } = require('./services/api');
    const fetchTasks = async () => {
      const fetched = await getTasks(token);
      setTasks(Array.isArray(fetched) ? fetched : []);
    };
    fetchTasks();
    const handler = () => fetchTasks();
    window.addEventListener('taskAdded', handler);
    return () => window.removeEventListener('taskAdded', handler);
  }, [token, view]);

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
          <TaskList token={token} tasks={tasks} setTasks={setTasks} onEdit={() => {}} />
        </>
      )}
    </div>
  );
}
