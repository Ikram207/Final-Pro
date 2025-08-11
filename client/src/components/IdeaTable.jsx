import React, { useState } from 'react';
import '../styles/Idea.css';
export default function IdeaTable({ ideas, onEdit, onDelete, onShowDetails }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th>Date début</th>
          <th>Date limite</th>
          <th>Personne</th>S
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {ideas.map(idea => (
          <tr key={idea._id}>
            <td onClick={() => onShowDetails(idea)} style={{ cursor: 'pointer' }}>{idea.title}</td>
            <td onClick={() => onShowDetails(idea)} style={{ cursor: 'pointer' }}>{idea.description}</td>
            <td>{idea.startDate ? idea.startDate.substring(0,10) : ''}</td>
            <td>{idea.endDate ? idea.endDate.substring(0,10) : ''}</td>
            <td>{idea.personName}</td>
            <td>
              <button onClick={() => onEdit(idea)} title="Modifier" style={{ marginRight: 8 }}>
                ✏️
              </button>
              <button onClick={() => onDelete(idea._id)} title="Supprimer">
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
