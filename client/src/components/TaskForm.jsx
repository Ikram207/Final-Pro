import React, { useState, useEffect } from 'react';

export default function TaskForm({ onSave, editingTask, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setStatus(editingTask.status || 'pending');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '');
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setStatus('pending');
      setDueDate('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Le titre est obligatoire');
      return;
    }
    if (!status) {
      alert('Le statut est obligatoire');
      return;
    }

    onSave({
      title,
      status,
      dueDate,
      description,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 20,
        border: '1px solid #ccc',
        padding: 15,
        borderRadius: 6
      }}
    >
      <h3>{editingTask ? 'Modifier une tâche' : 'Ajouter une tâche'}</h3>

      <div style={{ marginBottom: 10 }}>
        <label>Titre :</label><br />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 5 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Statut :</label><br />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
          style={{ width: '100%', padding: 5 }}
        >
          <option value="pending">En attente</option>
          <option value="in-progress">En cours</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Date limite :</label><br />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={{ width: '100%', padding: 5 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Description :</label><br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 5 }}
        />
      </div>

      <button type="submit" style={{ padding: '5px 10px' }}>
        {editingTask ? 'Mettre à jour' : 'Enregistrer'}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={cancelEdit}
          style={{ padding: '5px 10px', marginLeft: 10, background: '#ccc' }}
        >
          Annuler
        </button>
      )}
    </form>
  );
}
