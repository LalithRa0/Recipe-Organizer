import express from 'express';
import authenticate from '../middleware/auth.js'; // Use default import
import { addRecipe, getAllRecipes, deleteRecipe, updateRecipe } from '../controllers/recipe.js';

const router = express.Router();

router.post('/recipes', authenticate, addRecipe);
router.get('/recipes', authenticate, getAllRecipes);
router.put('/recipes/:id', authenticate, updateRecipe);
router.delete('/recipes/:id', authenticate, deleteRecipe);

export default router;
