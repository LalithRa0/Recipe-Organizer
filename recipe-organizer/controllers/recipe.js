import Recipe from '../models/Recipe.js';

export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, category, imageUrl } = req.body;
    const userId = req.userId;
    const recipe = await Recipe.create({ title, ingredients, instructions, category, imageUrl, userId });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add recipe', error: error.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const userId = req.userId;
    const recipes = await Recipe.findAll({ where: { userId } });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
  }
};



export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ where: { id: req.params.id, userId: req.userData.userId } });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ where: { id: req.params.id, userId: req.userData.userId } });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    await recipe.update(req.body);
    res.status(200).json({ message: 'Recipe updated', recipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ where: { id: req.params.id, userId: req.userData.userId } });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    await recipe.destroy();
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};
