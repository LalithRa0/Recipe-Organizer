const Recipe = require('./models/recipe'); 
const { authenticate } = require('./middleware/auth');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'DELETE') {
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

  const { id } = event.queryStringParameters;

  try {
    const recipe = await Recipe.findOne({ where: { id, userId } });

    if (!recipe) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Recipe not found' }),
      };
    }

    await recipe.destroy();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Recipe deleted' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error deleting recipe' }),
    };
  }
};
