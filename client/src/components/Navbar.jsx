// import React from 'react';
// import '../styles/Navbar.css';

// export default function Navbar({ setView, token, handleLogout }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         {!token ? (
//           <>
//             <button onClick={() => setView('login')}>Login</button>
//             <button onClick={() => setView('register')}>Register</button>
//           </>
//         ) : (
//           <>
//             <button onClick={() => setView('tasks')}>Tasks</button>
//             <button onClick={() => setView('ideas')}>Ideas</button>
//           </>
//         )}
//       </div>

//       <div className="navbar-right">
//         {token && (
//           <button className="logout" onClick={handleLogout}>
//             Déconnexion
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }
// ------------------------avec module idea---------------------------------------
// import React from 'react';

// export default function Navbar({ setView, token, handleLogout }) {
//   return (
//     <nav style={{ padding: 10, borderBottom: '1px solid #ccc', marginBottom: 20 }}>
//       {!token ? (
//         <>
//           <button onClick={() => setView('login')} style={{ marginRight: 10 }}>
//             Login
//           </button>
//           <button onClick={() => setView('register')}>
//             Register
//           </button>
//         </>
//       ) : (
//         <>
//           <button onClick={() => setView('tasks')} style={{ marginRight: 10 }}>
//             Tasks
//           </button>
//           <button onClick={() => setView('ideas')} style={{ marginRight: 10 }}>
//             Ideas
//           </button>
//           <button onClick={handleLogout} style={{ marginLeft: 'auto', background: 'red', color: '#fff' }}>
//             Déconnexion
//           </button>
//         </>
//       )}
//     </nav>
//   );
// }
import React from 'react';

export default function Navbar({ setView, token, handleLogout }) {
  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ccc', marginBottom: 20 }}>
      {!token ? (
        <>
          <button onClick={() => setView('login')} style={{ marginRight: 10 }}>
            Login
          </button>
          <button onClick={() => setView('register')}>
            Register
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setView('tasks')} style={{ marginRight: 10 }}>
            Tasks
          </button>
          <button onClick={handleLogout} style={{ marginLeft: 'auto', background: 'red', color: '#fff' }}>
            Déconnexion
          </button>
        </>
      )}
    </nav>
  );
}
