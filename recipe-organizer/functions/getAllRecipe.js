const Recipe = require('./models/recipe'); 
const { authenticate } = require('./middleware/auth'); 

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
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

  try {
    const recipes = await Recipe.findAll({ where: { userId } });
    return {
      statusCode: 200,
      body: JSON.stringify(recipes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching recipes' }),
    };
  }
};
