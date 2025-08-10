const Idea = require('../models/Idea');

// Créer une idée
const createIdea = async (req, res) => {
  try {
    const idea = new Idea(req.body);
    const savedIdea = await idea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer toutes les idées
const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une idée
const updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!idea) return res.status(404).json({ message: 'Idée non trouvée' });
    res.json(idea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une idée
const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idée non trouvée' });
    res.json({ message: 'Idée supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIdea,
  getIdeas,
  updateIdea,
  deleteIdea,
};
