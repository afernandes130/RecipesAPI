const jwt = require('jsonwebtoken');

module.exports = {
  tokenValidation: (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
      if (header.includes('Bearer')) {
        const Bearertoken = header.split(' ');
        const token = Bearertoken[1];
        try {
          jwt.verify(token, process.env.SECRETAPI);
          // req.tokendata = result //Utilizar esses dados ao inves de passar no body
          next();
        } catch (error) {
          res.status(401).json({ isValid: false, errorMessage: error.message });
        }
      } else {
        const error = {
          isValid: false,
          errorMessage: 'Authentication error. Bearer Token required.',
        };
        res.status(401).json(error);
      }
    } else {
      const error = {
        isValid: false,
        errorMessage: 'Authentication error. Token required.',
      };
      res.status(401).json(error);
    }
  },

  tokenGenerate: (user) => {
    const token = jwt.sign({ user }, process.env.SECRETAPI, { expiresIn: '24h' });
    return token;
  },
};
