import React from 'react';

export default function IdeaDetailsBox({ idea, onClose }) {
  if (!idea) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: 20, borderRadius: 6, maxWidth: 400, width: '90%' }}>
        <h3>{idea.title}</h3>
        <p><strong>Description:</strong> {idea.description}</p>
        <p><strong>Date début:</strong> {idea.startDate ? idea.startDate.substring(0,10) : '-'}</p>
        <p><strong>Date limite:</strong> {idea.endDate ? idea.endDate.substring(0,10) : '-'}</p>
        <p><strong>Personne:</strong> {idea.personName}</p>
        <button onClick={onClose} style={{ marginTop: 10 }}>Fermer</button>
      </div>
    </div>
  );
}
