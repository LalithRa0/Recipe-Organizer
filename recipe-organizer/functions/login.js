const jwt = require('jsonwebtoken');
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
  const user = await User.findOne({ where: { username: data.username } });

  if (!user || !await bcrypt.compare(data.password, user.password)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid credentials' }),
    };
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
