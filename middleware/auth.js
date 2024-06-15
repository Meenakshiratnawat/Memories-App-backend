const jwt = require('jsonwebtoken');

const secret = 'test';

exports.auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const authHeader = req.headers.authorization;
    console.log(`Authorization Header: ${authHeader}`);

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header is malformed' });
    }

    const token = authHeader.split(' ')[1];
    console.log(`Extracted Token: ${token}`);
    
    const isCustomAuth = token.length < 500;
    console.log(`Is Custom Auth: ${isCustomAuth}`);

    let decodedData;

    if (token && isCustomAuth) {
      console.log(req)
      try {
        decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
      } catch (error) {
        return res.status(401).json({ message: 'Invalid JWT token', error: error.message });
      }
    } else {
      try {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      } catch (error) {
        return res.status(401).json({ message: 'Invalid OAuth token', error: error.message });
      }
    }

    next();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
