// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Register from './components/Register';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import IdeaForm from './components/IdeaForm';
// import IdeaTable from './components/IdeaTable';
// import IdeaDetailsBox from './components/IdeaDetailsBox';
// import { getTasks, getIdeas } from './services/api';

// export default function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [view, setView] = useState('login'); // login | register | tasks | ideas
//   const [tasks, setTasks] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [selectedIdea, setSelectedIdea] = useState(null);

//   const handleLogin = async (jwt) => {
//     localStorage.setItem('token', jwt);
//     setToken(jwt);
//     setView('tasks');
//     const fetched = await getTasks(jwt);
//     setTasks(Array.isArray(fetched) ? fetched : []);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//     setTasks([]);
//     setIdeas([]);
//     setView('login');
//   };

//   // Tâches : rechargement après ajout
//   useEffect(() => {
//     if (!token || view !== 'tasks') return;
//     const fetchTasks = async () => {
//       const fetched = await getTasks(token);
//       setTasks(Array.isArray(fetched) ? fetched : []);
//     };
//     fetchTasks();
//     const handler = () => fetchTasks();
//     window.addEventListener('taskAdded', handler);
//     return () => window.removeEventListener('taskAdded', handler);
//   }, [token, view]);

//   // Idées : chargement
//   useEffect(() => {
//     if (!token || view !== 'ideas') return;
//     const fetchIdeas = async () => {
//       const fetched = await getIdeas(token);
//       setIdeas(Array.isArray(fetched) ? fetched : []);
//     };
//     fetchIdeas();
//   }, [token, view]);

//   return (
//     <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
//       <Navbar setView={setView} token={token} handleLogout={handleLogout} />

//       {/* LOGIN */}
//       {!token && view === 'login' && (
//         <>
//           <Login onLogin={handleLogin} />
//           <p>
//             Pas de compte ?{' '}
//             <button onClick={() => setView('register')}>Inscrivez-vous</button>
//           </p>
//         </>
//       )}

//       {/* REGISTER */}
//       {!token && view === 'register' && (
//         <>
//           <Register onRegister={() => setView('login')} />
//           <p>
//             Déjà un compte ?{' '}
//             <button onClick={() => setView('login')}>Connectez-vous</button>
//           </p>
//         </>
//       )}

//       {/* TASKS */}
//       {token && view === 'tasks' && (
//         <>
//           <TaskForm token={token} />
//           <TaskList token={token} tasks={tasks} setTasks={setTasks} onEdit={() => {}} />
//         </>
//       )}

//       {/* IDEAS */}
//       {token && view === 'ideas' && (
//         <>
//           <IdeaForm token={token} onIdeaAdded={() => setView('ideas')} />
//           <IdeaTable
//             token={token}
//             ideas={ideas}
//             setIdeas={setIdeas}
//             onSelectIdea={(idea) => setSelectedIdea(idea)}
//           />
//           <IdeaDetailsBox idea={selectedIdea} onClose={() => setSelectedIdea(null)} />
//         </>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import IdeaForm from './components/IdeaForm';
import IdeaTable from './components/IdeaTable';
import { getTasks, getIdeas, createIdea, createTask } from './services/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState('login'); // login | register | tasks | ideas
  const [tasks, setTasks] = useState([]);
  const [ideas, setIdeas] = useState([]);

  const handleLogin = async (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setView('tasks');

    const fetchedTasks = await getTasks(jwt);
    setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);

    const fetchedIdeas = await getIdeas(jwt);
    setIdeas(Array.isArray(fetchedIdeas) ? fetchedIdeas : []);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setTasks([]);
    setIdeas([]);
    setView('login');
  };

  useEffect(() => {
    if (!token) return;
    if (view === 'tasks') {
      getTasks(token).then(data => setTasks(Array.isArray(data) ? data : []));
    }
    if (view === 'ideas') {
      getIdeas(token).then(data => setIdeas(Array.isArray(data) ? data : []));
    }
  }, [view, token]);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <Navbar setView={setView} token={token} handleLogout={handleLogout} />

      {/* Auth pages */}
      {!token && view === 'login' && <Login onLogin={handleLogin} />}
      {!token && view === 'register' && <Register onRegister={() => setView('login')} />}

      {/* Task page */}
      {token && view === 'tasks' && (
        <>
          <TaskForm token={token} onSave={(taskData) => {
            createTask(token, taskData).then(newTask => {
              setTasks([...tasks, newTask]);
            });
          }} />
          <TaskList token={token} tasks={tasks} setTasks={setTasks} />
        </>
      )}

      {/* Idea page */}
      {token && view === 'ideas' && (
        <>
          <IdeaForm token={token} onSave={(ideaData) => {
            createIdea(token, ideaData).then(newIdea => {
              setIdeas([...ideas, newIdea]);
            });
          }} />
          <IdeaTable token={token} ideas={ideas} setIdeas={setIdeas} />
        </>
      )}
    </div>
  );
}
