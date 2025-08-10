import React, { useState } from 'react';
import { register } from '../services/api';
import '../styles/auth.css'; // Import du style

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = await register(name, email, password);
    if (result.message) {
      setSuccess('Inscription réussie ! Vous pouvez vous connecter.');
      setName('');
      setEmail('');
      setPassword('');
      onRegister();
    } else {
      setError(result.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>Inscription</h2>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">S'inscrire</button>
          {success && <p style={{color: 'green'}}>{success}</p>}
          {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
