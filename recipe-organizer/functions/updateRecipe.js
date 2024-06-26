const Recipe = require('./models/recipe'); 
const { authenticate } = require('./middleware/auth');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const userId = authenticate(event.headers.authorization);

  if (!userId) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden' }),
    };
  }

  const data = JSON.parse(event.body);
  const { id, ...updateData } = data;

  try {
    const recipe = await Recipe.findOne({ where: { id, userId } });

    if (!recipe) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Recipe not found' }),
      };
    }

    await recipe.update(updateData);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Recipe updated', recipe }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating recipe' }),
    };
  }
};
