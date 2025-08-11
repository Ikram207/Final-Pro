// // import React, { useState } from 'react';
// // import { createTask } from '../services/api';

// // export default function TaskForm({ token }) {
// //   const [title, setTitle] = useState('');
// //   const [dueDate, setDueDate] = useState('');
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setSuccess('');
// //     if (!title) {
// //       setError('Le titre est obligatoire');
// //       return;
// //     }
// //     const result = await createTask(token, { title, dueDate });
// //     if (result._id) {
// //       setSuccess('Tâche créée !');
// //       setTitle('');
// //       setDueDate('');
// //       window.dispatchEvent(new Event('taskAdded')); // événement pour rafraichir la liste
// //     } else {
// //       setError(result.error || 'Erreur création tâche');
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h3>Ajouter une tâche</h3>
// //       <input
// //         type="text"
// //         placeholder="Titre"
// //         value={title}
// //         onChange={e => setTitle(e.target.value)}
// //         required
// //       />
// //       <br />
// //       <input
// //         type="date"
// //         value={dueDate}
// //         onChange={e => setDueDate(e.target.value)}
// //       />
// //       <br />
// //       <button type="submit">Ajouter</button>
// //       {success && <p style={{color: 'green'}}>{success}</p>}
// //       {error && <p style={{color: 'red'}}>{error}</p>}
// //     </form>
// //   );
// // }
// import React, { useState, useEffect } from 'react';

// export default function TaskForm({ token, onSave, editingTask, cancelEdit }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [status, setStatus] = useState('pending');

//   useEffect(() => {
//     if (editingTask) {
//       setTitle(editingTask.title);
//       setDescription(editingTask.description);
//       setDueDate(editingTask.dueDate.substring(0, 10));
//       setStatus(editingTask.status);
//     }
//   }, [editingTask]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) {
//       alert('Le titre est requis');
//       return;
//     }
//     const updatedTask = { title, description, dueDate, status };
//     await onSave(updatedTask);
//     if (!editingTask) {
//       setTitle('');
//       setDescription('');
//       setDueDate('');
//       setStatus('pending');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={title} onChange={(e) => setTitle(e.target.value)} required />
//       <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//       <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
//       <select value={status} onChange={(e) => setStatus(e.target.value)}>
//         <option value="pending">En attente</option>
//         <option value="completed">Terminé</option>
//       </select>
//       <button type="submit">{editingTask ? 'Mettre à jour' : 'Ajouter'}</button>
//       {editingTask && <button type="button" onClick={cancelEdit}>Annuler</button>}
//     </form>
//   );
// }
import React, { useState, useEffect } from 'react';
import '../styles/Task.css';
export default function TaskForm({ token, onSave, editingTask, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '');
      setStatus(editingTask.status || 'pending');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Le titre est requis');
      return;
    }
    await onSave({ title, description, dueDate, status });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', background: '#f9f9f9' }}
    >
      <h3>{editingTask ? 'Modifier la tâche' : 'Ajouter une tâche'}</h3>
      
      <input 
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      
      <input 
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
      />
      
      <select 
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
      >
        <option value="pending">En attente</option>
        <option value="completed">Terminée</option>
      </select>

      <button type="submit" style={{ padding: '8px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
        {editingTask ? 'Mettre à jour' : 'Ajouter'}
      </button>
      
      {editingTask && (
        <button 
          type="button" 
          onClick={cancelEdit} 
          style={{ padding: '8px 12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', marginLeft: '8px' }}
        >
          Annuler
        </button>
      )}
    </form>
  );
}
