import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/tasks/${id}`)
        .then(res => setForm({
          ...res.data,
          dueDate: res.data.dueDate ? res.data.dueDate.split('T')[0] : '',
        }))
        .catch(console.error);
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      api.put(`/tasks/${id}`, form)
        .then(() => navigate('/ideas'))
        .catch(console.error);
    } else {
      api.post('/tasks', form)
        .then(() => navigate('/ideas'))
        .catch(console.error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="">-- Statut --</option>
        <option value="pending">En attente</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminé</option>
      </select>
      <button type="submit">{id ? 'Modifier' : 'Ajouter'}</button>
    </form>
  );
}
