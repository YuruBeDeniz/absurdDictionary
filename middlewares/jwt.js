const jwt= require('express-jwt');

const getTokenFromHeaders = req => {
      // Check if the token is available on the request Headers
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
 
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  } 
  return null;
}

const isAuthenticated = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	requestProperty: 'payload',
	getToken: getTokenFromHeaders,
});

module.exports = { isAuthenticated };