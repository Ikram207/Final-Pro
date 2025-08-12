import React from 'react';

export default function Navbar({ onLogout }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Liens à gauche */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <a href="/tasks" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Tâches</a>
        <a href="/ideas" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Idées</a>
      </div>

      {/* Bouton déconnexion à droite */}
      <button
        onClick={onLogout}
        style={{
          backgroundColor: '#dc3545',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Déconnexion
      </button>
    </nav>
  );
}
