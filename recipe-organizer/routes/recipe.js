import express from 'express';
import { addRecipe, getAllRecipes } from '../controllers/recipe.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, addRecipe);
router.get('/', authenticate, getAllRecipes);

export default router;
