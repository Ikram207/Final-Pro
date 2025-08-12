// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Register from './components/Register';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import IdeaForm from './components/IdeaForm';
// import IdeaTable from './components/IdeaTable';
// import { getTasks, getIdeas, createIdea, createTask, updateTask } from './services/api';

// export default function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [view, setView] = useState('login'); // login | register | tasks | ideas
//   const [tasks, setTasks] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);

//   const handleLogin = async (jwt) => {
//     localStorage.setItem('token', jwt);
//     setToken(jwt);
//     setView('tasks');

//     const fetchedTasks = await getTasks(jwt);
//     setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);

//     const fetchedIdeas = await getIdeas(jwt);
//     setIdeas(Array.isArray(fetchedIdeas) ? fetchedIdeas : []);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//     setTasks([]);
//     setIdeas([]);
//     setEditingTask(null);
//     setView('login');
//   };

//   useEffect(() => {
//     if (!token) return;
//     if (view === 'tasks') {
//       getTasks(token).then(data => setTasks(Array.isArray(data) ? data : []));
//     }
//     if (view === 'ideas') {
//       getIdeas(token).then(data => setIdeas(Array.isArray(data) ? data : []));
//     }
//   }, [view, token]);

//   // Gère création ou mise à jour de tâche
//   const handleSaveTask = async (taskData) => {
//     if (editingTask) {
//       const updated = await updateTask(token, editingTask._id, taskData);
//       setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
//       setEditingTask(null);  // Réinitialise formulaire après modification
//     } else {
//       const created = await createTask(token, taskData);
//       setTasks([...tasks, created]);
//       setEditingTask(null);  // Réinitialise formulaire après ajout
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
//       <Navbar setView={setView} token={token} handleLogout={handleLogout} />

//       {!token && view === 'login' && <Login onLogin={handleLogin} />}
//       {!token && view === 'register' && <Register onRegister={() => setView('login')} />}

//       {token && view === 'tasks' && (
//         <>
//           <TaskForm
//             token={token}
//             onSave={handleSaveTask}
//             editingTask={editingTask}
//             cancelEdit={() => setEditingTask(null)}
//           />
//           <TaskList
//             token={token}
//             tasks={tasks}
//             setTasks={setTasks}
//             onEdit={setEditingTask}
//           />
//         </>
//       )}

//       {token && view === 'ideas' && (
//         <>
//           <IdeaForm token={token} onSave={(ideaData) => {
//             createIdea(token, ideaData).then(newIdea => {
//               setIdeas([...ideas, newIdea]);
//             });
//           }} />
//           <IdeaTable token={token} ideas={ideas} setIdeas={setIdeas} />
//         </>
//       )}
//     </div>
//   );
// }
// ---------------------------avec module idea -----------------------------------------
// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Register from './components/Register';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import IdeaForm from './components/IdeaForm';
// import IdeaTable from './components/IdeaTable';
// import { getTasks, getIdeas, createIdea, createTask, updateTask } from './services/api';

// export default function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [view, setView] = useState(token ? 'tasks' : 'login'); // login | register | tasks | ideas
//   const [tasks, setTasks] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);

//   const handleLogin = async (jwt) => {
//     localStorage.setItem('token', jwt);
//     setToken(jwt);
//     setView('tasks');

//     const fetchedTasks = await getTasks(jwt);
//     console.log('Tâches après login:', fetchedTasks);
//     setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);

//     const fetchedIdeas = await getIdeas(jwt);
//     setIdeas(Array.isArray(fetchedIdeas) ? fetchedIdeas : []);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//     setTasks([]);
//     setIdeas([]);
//     setEditingTask(null);
//     setView('login');
//   };

//   useEffect(() => {
//     if (!token) return;
//     if (view === 'tasks') {
//       getTasks(token).then(data => {
//         console.log('Tâches chargées dans useEffect:', data);
//         setTasks(Array.isArray(data) ? data : []);
//       });
//     }
//     if (view === 'ideas') {
//       getIdeas(token).then(data => {
//         setIdeas(Array.isArray(data) ? data : []);
//       });
//     }
//   }, [view, token]);

//   const handleSaveTask = async (taskData) => {
//     if (editingTask) {
//       const updated = await updateTask(token, editingTask._id, taskData);
//       if (!updated.error) {
//         setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
//         setEditingTask(null);
//       } else {
//         alert(`Erreur mise à jour: ${updated.error}`);
//       }
//     } else {
//       const created = await createTask(token, taskData);
//       if (!created.error) {
//         setTasks([...tasks, created]);
//         setEditingTask(null);
//       } else {
//         alert(`Erreur création: ${created.error}`);
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
//       <Navbar setView={setView} token={token} handleLogout={handleLogout} />

//       {!token && view === 'login' && <Login onLogin={handleLogin} />}
//       {!token && view === 'register' && <Register onRegister={() => setView('login')} />}

//       {token && view === 'tasks' && (
//         <>
//           <TaskForm
//             token={token}
//             onSave={handleSaveTask}
//             editingTask={editingTask}
//             cancelEdit={() => setEditingTask(null)}
//           />
//           <TaskList
//             token={token}
//             tasks={tasks}
//             setTasks={setTasks}
//             onEdit={setEditingTask}
//           />
//         </>
//       )}

//       {token && view === 'ideas' && (
//         <>
//           <IdeaForm token={token} onSave={(ideaData) => {
//             createIdea(token, ideaData).then(newIdea => {
//               if (!newIdea.error) {
//                 setIdeas([...ideas, newIdea]);
//               } else {
//                 alert(`Erreur création idée: ${newIdea.error}`);
//               }
//             });
//           }} />
//           <IdeaTable token={token} ideas={ideas} setIdeas={setIdeas} />
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
import { getTasks, createTask, updateTask } from './services/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState(token ? 'tasks' : 'login'); // login | register | tasks
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleLogin = async (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    setView('tasks');

    const fetchedTasks = await getTasks(jwt);
    console.log('Tâches après login:', fetchedTasks);
    setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setTasks([]);
    setEditingTask(null);
    setView('login');
  };

  useEffect(() => {
    if (!token) return;
    if (view === 'tasks') {
      getTasks(token).then(data => {
        console.log('Tâches chargées dans useEffect:', data);
        setTasks(Array.isArray(data) ? data : []);
      });
    }
  }, [view, token]);

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      const updated = await updateTask(token, editingTask._id, taskData);
      if (!updated.error) {
        setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
      } else {
        alert(`Erreur mise à jour: ${updated.error}`);
      }
    } else {
      const created = await createTask(token, taskData);
      if (!created.error) {
        setTasks([...tasks, created]);
        setEditingTask(null);
      } else {
        alert(`Erreur création: ${created.error}`);
      }
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <Navbar setView={setView} token={token} handleLogout={handleLogout} />

      {!token && view === 'login' && <Login onLogin={handleLogin} />}
      {!token && view === 'register' && <Register onRegister={() => setView('login')} />}

      {token && view === 'tasks' && (
        <>
          <TaskForm
            token={token}
            onSave={handleSaveTask}
            editingTask={editingTask}
            cancelEdit={() => setEditingTask(null)}
          />
          <TaskList
            token={token}
            tasks={tasks}
            setTasks={setTasks}
            onEdit={setEditingTask}
          />
        </>
      )}
    </div>
  );
}
