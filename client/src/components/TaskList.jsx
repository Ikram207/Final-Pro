import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';

export default function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setError('');
    const result = await getTasks(token);
    if (Array.isArray(result)) {
      setTasks(result);
    } else {
      setError(result.message || 'Erreur chargement tâches');
    }
  };

  useEffect(() => {
    fetchTasks();

    // Rafraîchir la liste à chaque ajout de tâche
    const handleTaskAdded = () => fetchTasks();
    window.addEventListener('taskAdded', handleTaskAdded);
    return () => window.removeEventListener('taskAdded', handleTaskAdded);
  }, [token]);

  if (error) return <p style={{color: 'red'}}>{error}</p>;

  if (!tasks.length) return <p>Aucune tâche pour le moment.</p>;

  return (
    <div>
      <h3>Mes tâches</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> — {task.status}
            {task.dueDate && <> — échéance : {new Date(task.dueDate).toLocaleDateString()}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}
