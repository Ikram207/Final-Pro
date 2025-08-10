const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  status: { type: String, default: 'pending' },
  dueDate: { type: Date },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);