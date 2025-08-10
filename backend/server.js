require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');              // Ajout cors
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();

// Middleware pour autoriser CORS (cross-origin requests)
app.use(cors());

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Route racine pour test simple
app.get('/', (req, res) => {
  res.json({ message: 'API backend is working' });
});

// Routes de l’API
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Middleware gestion des routes non trouvées
app.use(notFound);

// Middleware gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
