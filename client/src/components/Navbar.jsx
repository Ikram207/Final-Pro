import React from 'react';

export default function Navbar({ setView }) {
  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ccc', marginBottom: 20 }}>
      <button onClick={() => setView('login')} style={{ marginRight: 10 }}>
        Login
      </button>
      <button onClick={() => setView('register')}>
        Register
      </button>
    </nav>
  );
}
