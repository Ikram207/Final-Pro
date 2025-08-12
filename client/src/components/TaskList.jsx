import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Statut</th>
          <th>Date limite</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task._id}>
            <td>{task.title || 'Titre manquant'}</td>
            <td>{task.status || 'Statut manquant'}</td>
            <td>{task.dueDate ? task.dueDate.substring(0, 10) : 'Date manquante'}</td>
            <td>
              <button onClick={() => onEdit(task)} title="Modifier" style={{ marginRight: 8 }}>
                ✏️
              </button>
              <button onClick={() => onDelete(task._id)} title="Supprimer">
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
