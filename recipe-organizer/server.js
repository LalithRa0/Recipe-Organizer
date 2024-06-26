import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default server;
