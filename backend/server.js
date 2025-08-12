require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
// const ideaRoutes = require('./routes/ideaRoutes'); // supprimé

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API backend is working' });
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
// app.use('/api/ideas', ideaRoutes); // supprimé

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
