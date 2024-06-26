const bcrypt = require('bcryptjs');
const User = require('./models/user'); 

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const data = JSON.parse(event.body);
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    await User.create({
      username: data.username,
      password: hashedPassword,
    });
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error registering user' }),
    };
  }
};
