// function Middleware(req, res, next) {
//  verifyToken(req, res, next);  {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'Access token is required' });
//   }
  

//   try {
//     // Verify the token
//     const decodedToken = jwt.verify(token, 'your-secret-key');

//     // Attach the decoded token to the request object for further use
//     req.user = decodedToken;
    

//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid token' });
//   }
// }

//   }

//   module.exports = Middleware;
  