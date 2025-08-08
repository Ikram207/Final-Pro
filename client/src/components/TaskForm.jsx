import React, { useState } from 'react';
import { createTask } from '../services/api';

export default function TaskForm({ token }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title) {
      setError('Le titre est obligatoire');
      return;
    }
    const result = await createTask(token, title, dueDate);
    if (result._id) {
      setSuccess('Tâche créée !');
      setTitle('');
      setDueDate('');
      window.dispatchEvent(new Event('taskAdded')); // événement pour rafraichir la liste
    } else {
      setError(result.error || 'Erreur création tâche');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ajouter une tâche</h3>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <br />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <br />
      <button type="submit">Ajouter</button>
      {success && <p style={{color: 'green'}}>{success}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}
