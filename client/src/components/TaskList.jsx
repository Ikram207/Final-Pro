// import React from 'react';
// import { deleteTask } from '../services/api';

// export default function TaskList({ token, tasks, setTasks, onEdit }) {

//   async function handleDelete(id) {
//     if(window.confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
//       const result = await deleteTask(token, id);
//       if(result.message === 'Tâche supprimée') {
//         setTasks(tasks.filter(task => task._id !== id));
//       } else {
//         alert(result.message || 'Erreur suppression tâche');
//       }
//     }
//   }

//   return (
//     <div>
//       <h3>Mes tâches</h3>
//       {tasks.length === 0 ? (
//         <p>Aucune tâche pour le moment.</p>
//       ) : (
//         <ul>
//           {tasks.map(task => (
//             <li key={task._id}>
//               <strong>{task.title}</strong> — {task.status}
//               {task.dueDate && <> — échéance : {new Date(task.dueDate).toLocaleDateString()}</>}
//               <button onClick={() => onEdit(task._id)} style={{ marginLeft: '10px' }}>Modifier</button>
//               <button onClick={() => handleDelete(task._id)} style={{ marginLeft: '5px', color: 'red' }}>Supprimer</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import React from 'react';
import { deleteTask } from '../services/api';
import '../styles/Task.css';
export default function TaskList({ token, tasks, setTasks, onEdit }) {

  async function handleDelete(id) {
    if(window.confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      const result = await deleteTask(token, id);
      if(result.message === 'Tâche supprimée') {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        alert(result.message || 'Erreur suppression tâche');
      }
    }
  }

  return (
    <div>
      <h3>Mes tâches</h3>
      {tasks.length === 0 ? (
        <p>Aucune tâche pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li key={task._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', marginBottom: '8px', background: '#fff' }}>
              <strong>{task.title}</strong> — {task.status}
              {task.dueDate && <> — échéance : {new Date(task.dueDate).toLocaleDateString()}</>}
              <div style={{ marginTop: '8px' }}>
                <button onClick={() => onEdit(task)} style={{ marginRight: '5px', background: '#ffc107', border: 'none', padding: '6px 10px', borderRadius: '4px' }}>Modifier</button>
                <button onClick={() => handleDelete(task._id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px' }}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
