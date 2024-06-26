const Recipe = require('./models/recipe'); 
const { authenticate } = require('./middleware/auth'); 

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const data = JSON.parse(event.body);
  const userId = authenticate(event.headers.authorization);

  if (!userId) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden' }),
    };
  }

  try {
    await Recipe.create({
      ...data,
      userId,
    });
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Recipe added' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error adding recipe' }),
    };
  }
};
