// import React, { useState, useEffect } from 'react';

// export default function IdeaForm({ token, onSave, editingIdea, cancelEdit }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [personName, setPersonName] = useState('');

//   useEffect(() => {
//     if (editingIdea) {
//       setTitle(editingIdea.title || '');
//       setDescription(editingIdea.description || '');
//       setStartDate(editingIdea.startDate ? editingIdea.startDate.substring(0,10) : '');
//       setEndDate(editingIdea.endDate ? editingIdea.endDate.substring(0,10) : '');
//       setPersonName(editingIdea.personName || '');
//     } else {
//       setTitle('');
//       setDescription('');
//       setStartDate('');
//       setEndDate('');
//       setPersonName('');
//     }
//   }, [editingIdea]);

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!title) {
//       alert('Le titre est requis');
//       return;
//     }
//     onSave({
//       title,
//       description,
//       startDate,
//       endDate,
//       personName,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
//       <div>
//         <label>Titre :</label><br />
//         <input value={title} onChange={e => setTitle(e.target.value)} required />
//       </div>
//       <div>
//         <label>Description :</label><br />
//         <textarea value={description} onChange={e => setDescription(e.target.value)} />
//       </div>
//       <div>
//         <label>Date début :</label><br />
//         <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
//       </div>
//       <div>
//         <label>Date limite :</label><br />
//         <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
//       </div>
//       <div>
//         <label>Nom de la personne :</label><br />
//         <input value={personName} onChange={e => setPersonName(e.target.value)} />
//       </div>
//       <button type="submit" style={{ marginTop: 10 }}>
//         {editingIdea ? 'Mettre à jour' : 'Enregistrer'}
//       </button>
//       {editingIdea && (
//         <button type="button" onClick={cancelEdit} style={{ marginLeft: 10 }}>
//           Annuler
//         </button>
//       )}
//     </form>
//   );
// }
import React, { useState, useEffect } from 'react';
import '../styles/Idea.css';
export default function IdeaForm({ token, onSave, editingIdea, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [personName, setPersonName] = useState('');

  // Remplit les champs si on est en mode édition
  useEffect(() => {
    if (editingIdea) {
      setTitle(editingIdea.title || '');
      setDescription(editingIdea.description || '');
      setStartDate(editingIdea.startDate ? editingIdea.startDate.substring(0, 10) : '');
      setEndDate(editingIdea.endDate ? editingIdea.endDate.substring(0, 10) : '');
      setPersonName(editingIdea.personName || '');
    } else {
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setPersonName('');
    }
  }, [editingIdea]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Le titre est requis');
      return;
    }

    onSave({
      title,
      description,
      startDate,
      endDate,
      personName,
    });

    // Si on n'est pas en mode édition, vider les champs après enregistrement
    if (!editingIdea) {
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setPersonName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, border: '1px solid #ccc', padding: 15, borderRadius: 6 }}>
      <h3>{editingIdea ? 'Modifier une idée' : 'Ajouter une idée'}</h3>

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
        <label>Description :</label><br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 5 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Date début :</label><br />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          style={{ width: '100%', padding: 5 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Date limite :</label><br />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={{ width: '100%', padding: 5 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Nom de la personne :</label><br />
        <input
          value={personName}
          onChange={e => setPersonName(e.target.value)}
          style={{ width: '100%', padding: 5 }}
        />
      </div>

      <button type="submit" style={{ padding: '5px 10px' }}>
        {editingIdea ? 'Mettre à jour' : 'Enregistrer'}
      </button>

      {editingIdea && (
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
