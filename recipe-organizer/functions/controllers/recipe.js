import Recipe from '../models/recipe.js';

// Add a new recipe
export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, category, imageUrl } = req.body;
    const userId = req.user.userId; // assuming req.user is set by the auth middleware
    const recipe = await Recipe.create({ title, ingredients, instructions, category, imageUrl, userId });
    res.status(201).json({ message: 'Recipe added', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error adding recipe', error: error.message });
  }
};

// Get all recipes for a user
export const getAllRecipes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recipes = await Recipe.findAll({ where: { userId } });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

// Update a recipe
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, category, imageUrl } = req.body;
    const userId = req.user.userId;
    const recipe = await Recipe.findOne({ where: { id, userId } });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    await recipe.update({ title, ingredients, instructions, category, imageUrl });
    res.status(200).json({ message: 'Recipe updated', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
};

// Delete a recipe
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const recipe = await Recipe.findOne({ where: { id, userId } });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    await recipe.destroy();
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};
